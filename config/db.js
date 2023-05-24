const mongoose = require('mongoose');
const config = require('./config');
require("dotenv").config();


function dbConnect(){
    mongoose.connect(config.mongoUrl)

    mongoose.connection.on("connected", () => {
        console.log('Mongodb connected successfully')
    })

    mongoose.connection.on("error", (err) => {
        console.log('An error occured, NOT connected')
        console.log(err)
    })
}

module.exports = dbConnect;