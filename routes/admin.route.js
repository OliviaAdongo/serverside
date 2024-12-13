const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

// Get Admin Profile
router.get('/profile', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).send('Unauthorized');
    }

    const admin = await User.findById(req.session.user.id).select('-password'); // Don't return password
    if (!admin) {
      return res.status(404).send('Admin not found');
    }

    res.json(admin); // Send admin data as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching admin profile');
  }
});

// Update Admin Profile
router.put('/profile', async (req, res) => {
  const { name, email } = req.body;
  try {
    if (!req.session.user) {
      return res.status(401).send('Unauthorized');
    }

    const admin = await User.findById(req.session.user.id);
    if (!admin) {
      return res.status(404).send('Admin not found');
    }

    // Update the fields
    admin.name = name || admin.name;
    admin.email = email || admin.email;

    await admin.save(); // Save updated admin data
    res.status(200).send('Profile updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating profile');
  }
});

module.exports = router;
