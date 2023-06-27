const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
//@desc     Get user data
//@route    GET /api/users/me
//@access   Private

const getMe =  async (req, res) => {
    const {_id, name, email} = await userModel.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    });
};


//@desc     Login a user
//@route    POST /api/users/login
//@access   Public


const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            res.status(400);
            throw new Error("Please enter all fields");
        }

        //Check if user exists
        const user = await userModel.findOne({email});

        if(user) {
            await bcrypt.compare(password, user.password);
             res.redirect('/')
            //  .json({
            //     _id: user._id,
            //     name: user.name,
            //     email: user.email,
            //     token: generateToken(user._id),
            //     msg: "User logged in successfully"
            // }).
        }else {
            res.status(401).redirect("/signup");
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error"});
    }
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
            res.redirect("/login");
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
        res.json(newUser).redirect("/login");

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token: generateToken(newUser._id),
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

//Generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "5h"
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe
}