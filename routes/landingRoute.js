const express = require("express")

const router = express.Router()

//routes
//@route    GET /
//@desc     Render the index page
//@access   Public

/**
 * @swagger
 * /:
 *   get:
 *    summary: Render the index page
 *    description: Render the index page
 *    responses:
 *      200:
 *        description: Index page rendered
 *      500:
 *        description: Server error
 * 
 */

router.get('/', (req, res) => {
    res.render('index.ejs')
});


//@route    GET /signup
//@desc     Render the signup page
//@access   Public

/**
 * @swagger
 * /signup:
 *    get:
 *      summary: Render the signup page
 *      description: Render the signup page
 *      responses:
 * 
 */
router.get('/signup', (req, res) => {
    res.render('signup.ejs')
});

router.get('/login', (req, res) => {
    res.render('login.ejs')
});

module.exports = router;