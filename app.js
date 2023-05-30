const express = require('express');
require("dotenv").config();
const dbConnect = require('./config/db');

const app = express();

//connect to database
dbConnect();
const PORT = process.env.PORT || 4000;

app.use(express.json({extended: false}));

//routes
app.use("/", require('./routes/index'));
app.use("/api/url", require('./routes/urlRoute'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})