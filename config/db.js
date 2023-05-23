const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoUrl');



function dbConnect(){
    mongoose.connect(db)

    mongoose.connection.on("connected", () => {
        console.log('Mongodb connected successfully')
    })

    mongoose.connection.on("error", (err) => {
        console.log('An error occured, NOT connected')
        console.log(err)
    })
}

module.exports = dbConnect;