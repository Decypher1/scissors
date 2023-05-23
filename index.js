const express = require('express');
require("dotenv").config();
const dbConnect = require('./config/db');

const app = express();
dbConnect();
const PORT = process.env.PORT || 4000;
app.use(express.json({extended: false}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})