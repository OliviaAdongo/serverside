const express = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
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
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    // Save user session
    req.session.user = { id: user._id, email: user.email };
    res.redirect('/adash.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login.html');
  });
});

module.exports = router;
