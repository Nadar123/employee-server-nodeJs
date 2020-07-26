const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const { findOne } = require('../models/User');

// @route post api/users
// @desc regsiter a user
// @access public
router.post('/', [
  body('name', 'Please add your name').not().isEmpty(),
  body('password', 'Please enter a pwassword with more then 6 characters').isLength({ min: 5 }),
  body('email', 'Please enter a pwassword with more then 6 characters').isEmail().normalizeEmail()
],  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {name, email, password} = req.body;

  try {
    //check if user exists
    let user = await User.findOne({ email });
    if(user) {
      return res.status(400).json({msg: 'User already exists'});
    }
    // create new user
    user = new User({
      name,
      email,
      password
    });
  
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // object send to token ot get the user id
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000
    }, (err, token) => {
      if(err) throw err;
      res.json({ token });
    });

  } catch(err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
  
});

module.exports = router;