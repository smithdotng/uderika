/*

 createa folder called public and put the css and js files in it,
 also ensure you are the following folder structure

 server.js
 public
    css
    js

*/

const express = require("express");
// const mongoose = require('mongoose');
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const uri = require("./atlas_uri");
require("dotenv").config(); /* ### require environemnt variables ### */
const expressValidator = require('express-validator');


const port = 8000; // Change this to your desired port

const DataSchema = new mongoose.Schema({
    fullname:{type:"string"},
    email:{type:"string"},
    password:{type:"string"},
})
const Data = mongoose.model("users", DataSchema);

mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
mongoose.connection.on("open",()=>console.log("Db connected"))
mongoose.connection.on("error",(e)=>console.log(e))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(expressValidator());

app.use(express.static(path.join(__dirname, "public")));

// Send the HTML file when the root URL is accessed
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "signup.html"));
});


/* app.post('/signup', async (req, res) => {
  
    
      const fullname = req.body.name;
      const email =req.body.email;
      const password = req.body.password;
    
      const data = new Data({fullname,email,password})
      data.save();

    res.sendFile(path.join(__dirname, 'public', 'student-lesson.html'));
      
    }) 

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
}); */

app.post('/signup', async (req, res) => {
    // Validate the form data
   /*  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return an error message to the user
      return res.status(400).json({ errors: errors.array() });
    } */
  
    // Check if the user already exists
    /* const user = await Data.findOne({ email: req.body.email });
    if (user) {
      // Return an error message to the user
      return res.status(409).json({ error: 'User already exists' });
    } */
  
    // Create a new user instance
    const newUser = new Data({
      fullname: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  
    // Save the user to the database
    try {
      await newUser.save();
      // Redirect the user to the student-lesson page
      res.redirect('/student-lesson');
    } catch (error) {
      // Handle the error
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});