const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
//@desc     Get user data
//@route    GET /api/users/me
//@access   Public

const getMe =  async (req, res) => {
    res.json({msg: "View user data"});
};


//@desc     Login a user
//@route    POST /api/users/login
//@access   Public


const loginUser = async (req, res) => {
    const {email, password} = req.body;

    //checks for user's email
    const user = userModel.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
       res.json({
              _id: user._id,
              name: user.name,
              email: user.email,
              msg: "User logged in successfully"
         });                                                                                                    
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
    
    // if(!email || !password){
    //     res.status(400).json({msg: "Please enter all fields"});
    //     throw new Error("Please enter all fields");
    // }

    // if(!email.includes("@")){
    //     res.status(400).json({msg: "Please enter a valid email"});
    //     throw new Error("Please enter a valid email");
    // }

    // //Check if user exists
    // if(email && password){

    // }
};


//@desc     Register a user
//@route    POST /api/users
//@access   Public

const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            res.status(400).json({msg: "Please enter all fields"});
            throw new Error("Please enter all fields");
        }

        //Check if user already exists
        const userExists = await userModel.findOne({email});
        if(userExists){
            res.status(400).json({msg: "User already exists"});
            throw new Error("User already exists");
        }

        //Hashing the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        //Save the user
        await newUser.save();
        res.json(newUser);

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                msg: "User created successfully"
            });
        } else {
            res.status(401)
            throw new Error("Invalid user data");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: "Server error"});
    }  
};

module.exports = {
    registerUser,
    loginUser,
    getMe
}