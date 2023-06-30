const express = require('express');
require("dotenv").config();
const dbConnect = require('./config/db');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


//swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "URL Shortener API",
            description: "URL Shortener API Information",
            contact: {
                name: "Decypher",
                url:"https://github.com/Decypher1"
            },
            version: "1.0.0"
        },
        servers: [
            {
                url: "https://scissor-q4k6.onrender.com/",
                description: "Development server",
            },
        ],
    },
    apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);



//initialize express
const app = express();

//connect to database
dbConnect();
const PORT = process.env.PORT || 4000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.urlencoded({extended : false}));
app.use(express.json({extended: false}));
app.use(bodyParser.json());


//serving our view files
app.set("view engine", "ejs");
app.set("views", "views");


//rate limiter
const limiter = rateLimit({
    windowMs : 15 * 60 * 1000, //15mins
    max: 50 
})

app.use(limiter);

//routes
app.use('/', require('./routes/landingRoute'))
app.use('/signup', require('./routes/landingRoute'))
app.use('/login', require('./routes/landingRoute'))
app.use("/api", require('./routes/index'));
app.use("/api/url", require('./routes/urlRoute'));
app.use("/api/users", require('./routes/userRoute'));

//catch all route
app.get('*', (req, res) => {
    res.status(404)
    res.json({message : "Not Found"})
})



//Server 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})