const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.redirect('/login.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    res.send('Login successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
