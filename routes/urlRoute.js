const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('../config/config');

const urlModel = require('../models/urlModel');

//@route    POST /api/url/shorten
//@desc     Create short URL

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
                
                url = new urlModel({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
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