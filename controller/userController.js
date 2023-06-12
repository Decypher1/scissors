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
    res.json({msg: "Login user"});
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
        
        res.json({msg: "Register a user"});
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
};