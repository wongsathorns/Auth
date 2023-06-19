const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/userModels');

mongoose
  .connect('mongodb://127.0.0.1/CTI', {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const UserController = {
  register: async (req, res) => {
    try {
      const { name, password } = req.body;
      const user = await User.create({ name, password });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  },

  login: async (req, res) => {
    try {
      const { name, password } = req.body;
      const user = await User.findOne({ name });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = user.generateToken();

    
      user.session = token;
      await user.save();

      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: 'Failed to authenticate user' });
    }
  },

  logout: async (req, res) => {
    try {
      const userId = req.user.id; 
      console.log(userId)
      const user = await User.findById(userId);
      console.log(user)
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      user.session = null; 
      await user.save();

      res.json({ message: 'Logout successful' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to logout' });
    }
  },
};

module.exports = UserController;
