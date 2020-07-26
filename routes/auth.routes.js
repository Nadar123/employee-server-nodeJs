const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const { body, validationResult } = require('express-validator');

const User = require('../models/User');


// @route get api/auth
// @desc get request for logging a user
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route post api/auth
// @desc post request for logging a user
// @access public
router.post('/', [
  body('email', 'Please inculde a valid email').isEmail().normalizeEmail(),
  body('password', 'password is required').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const{email, password} = req.body;

  try {
    let user = await User.findOne({ email });

    if(!user) {
      return res.status(400).json({msg: 'Invallid Credentials'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({msg: 'Invalid Credentials'})
    }
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload, config.get('jwtSecret'), {
      expiresIn: 360000
    }, (err, token) => {
      if(err) throw err;
      res.json({ token });
    });
    
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;