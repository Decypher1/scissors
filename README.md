# scissors
 
### Introduction
In today’s world, it’s important to keep things as short as possible, and this applies to more concepts than you may realize. From music, speeches, to wedding receptions, brief is the new black. Scissor is a simple tool which makes URLs as short as possible. Scissor thinks it can disrupt the URL shortening industry and give the likes of bit.ly
### Scissors Support Features
* Users can signup and login to their accounts
* Public (non-authenticated) users can only generate shorter links
* Authenticated users can access all causes as well as create a new link, be able to generate QR code for their links and view older links they have created.
### Installation Guide
* Clone this repository [here](https://github.com/Decypher1/scissors.git).
* The develop branch is the most stable branch at any given time, ensure you're working from it.
* Run npm install to install all dependencies
* You can either work with the default mLab database or use your locally installed MongoDB. Do configure to your choice in the application entry file.
* Create an .env file in your project root folder and add your variables. See .env.sample for assistance.
### Usage
* Run npm run dev to start the application.
* Connect to the API using Postman on port 4000.
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/users/ | To sign up a new user account |
| POST | /api/users/login | To login an existing user account |
| POST | /api/url/shorten | To shorten long url |
| GET | / | To render the landing page |
| GET | /api/url/{code} | To reroute the created link to the long url |
| GET | /login | To renders login page |
| GET | /signup | To render a signup page |
| GET | /api-docs | To open the docs for the api |
### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
* [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.
### Authors
* [Martins Umekwe](https://github.com/decypher1)
### License
This project is available for use under the ISC License.