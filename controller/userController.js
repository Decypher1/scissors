//@desc     Get user data
//@route    GET /api/users/me
//@access   Public

const getMe = async (req, res) => {
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
    res.json({msg: "Register a user"});
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};