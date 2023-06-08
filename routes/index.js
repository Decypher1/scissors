const express = require('express');
const router = express.Router();

const urlModel = require('../models/urlModel');

// @route       GET /:code
// @desc        Reroute the created link to the long url

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