const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const secretKey = require('../config.js')

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authorization token not provided' });
    }

    const decoded = jwt.verify(token, secretKey);

    const user = await User.findOne({ _id: decoded.userId, 'session': token });

    if (!user) {
      return res.status(401).json({ error: 'Invalid token or user not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authenticateUser;
