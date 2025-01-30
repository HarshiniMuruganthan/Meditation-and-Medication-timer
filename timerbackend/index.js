const express = require('express');
const path = require('path');
const mdb = require('mongoose');
const dotenv = require('dotenv');
const Signup = require("./models/signupSchema");
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());

mdb.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connection Successful");
  })
  .catch((err) => 
    {
    console.log("MongoDb connection unsuccessful", err);
  });

  
app.get('/', (req, res) => {
  res.send("Welcome to Backend friends");
});

app.get('/static', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.post('/signup', async(req, res) => {
  var { firstname, lastname, username, email, password } = req.body;
  var hashedPassword=await bcrypt.hash(password,15);
  console.log(hashedPassword)
  try {
    console.log("inside try");
    const newCustomer = new Signup({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: hashedPassword,
    });

    console.log(newCustomer);
    newCustomer.save();
    res.status(201).json({response:"Signup successful",signupStatus:true});
  } catch (err) {
    res.status(400).send("Signup unsuccessful", err);
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email: email });
    if (!user) {
      
      return res.status(404).send({response:"User not found",loginStatus:false});
    }

    if (bcrypt.compare(user.password , password)) {
      res.status(200).send({response:"Login successful",loginStatus:true});
    } else {
      res.status(401).send({response:"Incorrect password",loginStatus:false});
    }
  } catch (err) {
    res.status(500).send("Error during login");
  }
});

app.get('/getsignupdet', async (req, res) => {
  try {
    const signUpdet = await Signup.find();
    res.status(200).json(signUpdet);
  } catch (err) {
    res.status(500).send("Error fetching signup details");
  }
});


  
  

app.listen(3001, () => {
  console.log("Server connected on port 3001");
});