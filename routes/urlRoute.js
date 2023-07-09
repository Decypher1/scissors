const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('../config/config');

const urlModel = require('../models/urlModel');

//@route    POST /api/url/shorten
//@desc     Create short URL


/**
 * @swagger
 * /api/url/shorten:
 *  post:
 *     summary: Create short URL
 *     description: Create short URL
 *     requestBody:
 *     content:
 *     application/json:
 *     schema:
 *     type: object
 *     properties:
 *     longUrl:
 *       type: string
 *       description: The URL to be shortened
 *     parameters:
 *        - in: body
 *          name: longUrl
 *          description: The URL to be shortened
 *          schema:
 *           type: string
 *           required: true
 *     responses:
 *      200:
 *        description: Short URL created
 *      401:
 *        description: Invalid long URL
 *      500:
 *        description: Server error
 *      
 */

router.post('/shorten', async (req, res) => {
    const {longUrl} = req.body;
    const baseUrl = config.baseUrl;

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json("Invalid base url");
    }

    //create url code
    const urlCode = shortid.generate();

    //check the long url;
    if(validUrl.isUri(longUrl)){
        try{
            let url = await urlModel.findOne({longUrl});
            if(url){
                res.json(url);
            }else{
                const shortUrl = baseUrl + '/' + urlCode;
                const counterClicks = urlModel.analytics.userClicks;
                counterClicks = counterClicks + 1;

                
                url = new urlModel({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date(),
                    analytics: {
                        userClicks: counterClicks
                    }
                })
                await url.save();
                res.json(url);
            }
        }catch(err){
            console.log(err);
            res.status(500).json("Server error");
        }
    }else{

        res.status(401).json("Invalid long url");
    }

});

module.exports = router;