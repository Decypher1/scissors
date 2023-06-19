const express = require('express');
require("dotenv").config();
const dbConnect = require('./config/db');
const rateLimit = require('express-rate-limit');


const app = express();

//connect to database
dbConnect();
const PORT = process.env.PORT || 4000;

app.use(express.json({extended: false}));


//rate limiter
const limiter = rateLimit({
    windowMs : 15 * 60 * 1000, //15mins
    max: 50 

})

app.use(limiter);

//routes
app.use("/", require('./routes/index'));
app.use("/api/url", require('./routes/urlRoute'));
app.use("/api/users", require('./routes/userRoute'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})