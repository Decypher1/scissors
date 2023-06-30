const express = require('express');

const router = express.Router();
const {registerUser, loginUser, getMe} = require('../controller/userController');
const {protect} = require('../middleware/authMiddleware');


// @route       POST /api/users
// @desc        Register a user
// @access      Public

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Register a user
 *    description: Register a user
 *    requestBody:
 *    content:
 *    application/json:
 *    schema:
 *    type: object
 *    properties:
 *    name:
 *      type: string
 *      description: The name of the user
 *    email: 
 *      type: string
 *      description: The email of the user
 *    password:
 *      type: string
 *      description: The password of the user
 *    parameters:
 *       - in: body
 *         name: name
 *         description: The name of the user
 *         schema:
 *           type: string
 *           required: true
 *       - in: body
 *         name: email
 *         description: The email of the user
 *         schema:
 *           type: string
 *           required: true
 *       - in: body
 *         name: password
 *         description: The password of the user
 *         schema:
 *           type: string
 *           required: true
 *    responses:
 *      200:
 *        description: User registered successfully
 *      400:
 *        description: Please enter all fields
 *      500:
 *        description: Server error
 *  
 */

router.post('/', registerUser);

// @route       POST /api/users/login
// @desc        Login a user
// @access      Public

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user
 *     requestBody:
 *     content:
 *     application/json:
 *     schema:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         description: The email of the user
 *       password:
 *         type: string
 *         description: The password of the user
 *     parameters:
 *       - in: body
 *         name: email
 *         description: The email of the user
 *         example: johndoe@gmail.com
 *         schema:
 *           type: string
 *           required: true
 *       - in: body
 *         name: password
 *         description: The password of the user
 *         example: 123456
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Please enter all fields
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 * 
 */
router.post('/login', loginUser);



router.get('/me', protect, getMe);

module.exports = router;