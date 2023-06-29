const express = require('express');
const router = express.Router();

const urlModel = require('../models/urlModel');

// @route       GET /:code
// @desc        Reroute the created link to the long url


/**
 * @swagger
 * /api/url/{code}:
 *  get:
 *    summary: Reroute the created link to the long url
 *    description: Reroute the created link to the long url
 *    parameters:
 *      - in: path
 *        name: code
 *        required: true
 *        description: The code to be used to reroute the link
 *        schema:
 *         type: string
 *    responses:
 *         200:
 *           description: Rerouted
 *         404:
 *           description: Not Found
 *         500:
 *           description: Server error
 * 
 */
router.get("/:code", async (req, res) => {
    try {
        const url = await urlModel.findOne({urlCode: req.params.code});

        if(url) {
            return res.redirect(url.longUrl)
        }else{
            return res.status(404).json({message : "Not Found"})
        }
    } catch (err){
        console.error(err);
        res.status(500).json('Server error');
    }

})

module.exports = router;