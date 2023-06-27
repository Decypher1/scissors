const express = require('express');
require("dotenv").config();
const dbConnect = require('./config/db');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const {registerUser, loginUser} = require('./controller/userController');
const app = express();

//connect to database
dbConnect();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({extended : false}));
app.use(express.json({extended: false}));
app.use(bodyParser.json());


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

app.post('/signup', registerUser);
app.post('/login', loginUser);

//catch all route
app.get('*', (req, res) => {
    res.status(404)
    res.json({message : "Not Found"})
})
//rate limiter
const limiter = rateLimit({
    windowMs : 15 * 60 * 1000, //15mins
    max: 50 

})

app.use(limiter);


//routes

// app.use("/", require('./routes/index'));
// app.use("/api/url", require('./routes/urlRoute'));
// app.use("/api/users", require('./routes/userRoute'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})