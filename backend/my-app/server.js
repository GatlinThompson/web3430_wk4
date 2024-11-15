let express = require('express')
let path = require('path')
import mongoose from 'mongoose'
var cookieParser = require('cookie-parser');
//this will eventually be placed elsewhere...
const jwt = require("jsonwebtoken");

// the name of the db can be changed. it will be created automatically on startup
mongoose.connect("mongodb://127.0.0.1:27017/authdb",{
  useNewUrlParser: true,
  useUnifiedTopology: true
},()=>{
  console.log("Connected")
})

//create the web server
export let app = express()

app.use(cookieParser());

app.use('/',function(req, res, next){
    console.log(req.url);
    next();
 });


// middle ware for processing json files
app.use(express.json())

// helps encode the urls properly
app.use(express.urlencoded({extended: false}))
// set up a place for static files 7:07
app.use(express.static(path.join(__dirname, 'public')))

// Routing
import {configureRoutes} from './src/javascripts/config/routes'
configureRoutes(app)

//Create the web server
let http = require('http')
let server = http.createServer(app)
server.listen(process.env.PORT || '8080')
server.on('error', err => {
    throw err
})

server.on('listening', () => {
    let address = server.address()
    let bind = typeof address === 'string' ? address : address.port
    console.log("Listening on " + bind)
})


//the below will be refactored

// const SECRET_KEY = "notsecureSecret";
// const expiresIn = "24h";
// function createToken(payload) {
//   return jwt.sign(payload, SECRET_KEY, { expiresIn });
// }

// function isAuthenticated(username, password) {
//   if (username === "admin@school.edu" && password === "asdf"){
//     return true
//   }else{
//     if (username === "teacher@school.edu" && password === "asdf"){
//       return true;
//     }else{
//       return false;
//     }
//   }
// }


// app.post("/api/users/signin", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     if (isAuthenticated(username, password)) {
//       let assignedRole = ""
//       if (username == "admin@school.edu"){
//         assignedRole = "admin"
//       }else{
//         assignedRole = "teacher"
//       }
//       let data = {
//         username: username,
//         role: assignedRole
//       };
  
//       const token = createToken(data);
//       console.log(token);
//       res.cookie("token", token, { maxAge: 1000 * 60 * 60 })
//       res.json({
//         message: "You authenticated!",
//         success: true,
//         username: username,
//         token,
//       });
//       res.end();
//     } else {
//       res.json({ message: "You DID NOT authenticate", success: false });
//     }
//   });
  
