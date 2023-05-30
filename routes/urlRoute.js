const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('../config/config');

const urlModel = require('../models/urlModel')

module.exports = router;