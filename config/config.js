require("dotenv").config();

module.exports = {
    mongoUrl: process.env.mongoUrl,
    PORT: process.env.PORT || 4000,
    baseUrl: process.env.baseUrl || "http://localhost:4000"
}


