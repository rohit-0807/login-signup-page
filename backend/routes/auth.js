const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const  router = express.Router();
const JWT_SECRET = "secert123";
//signup route
// router.post('/signup', async (req, res)=> {
//     const {name, email,password} = req.body;
//     console.log(req.body);
//     const existingUser = await User.findOne({email});
//     if(existingUser){
//         return res.status(400).json({message : "user already exists"});
//     }

//     const hashedPassword = await bcrypt.hash(password,8);
//     const newuser = new user({name,email,password:hashedPassword});
//     await newuser.save();

//     res.status(201).json({message : "user created successfully"});
// });

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Incoming signup request:', req.body); // Log incoming data

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists!');
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log('User created:', savedUser); // Log the saved user

    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ error: 'Server error during signup' });
  }
});



//login route
router.post('/login', async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message : "user not found or invalid credentials"});

    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message :"invalid credentials"});
    }

    const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'1h'});
    res.json({token, user: {id:user._id, name:user.name, email:user.email} });

});


module.exports = router;


