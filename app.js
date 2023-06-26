const express = require('express');
require("dotenv").config();
const dbConnect = require('./config/db');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
//const path = require('path')

const app = express();

//connect to database
dbConnect();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({extended : false}));
app.use(express.json({extended: false}));
app.use(bodyParser.urlencoded({ extended: true }));

//serving public folder
//app.use(express.static(path.join(__dirname, 'public')));

//serving our view files
app.set("view engine", "ejs");
app.set("views", "views");

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/signup', (req, res) => {
    res.render('signup.ejs')
});

app.get('/login', (req, res) => {
    res.render('login.ejs')
    });
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