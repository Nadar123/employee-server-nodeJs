const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @route post api/users
// @desc regsiter a user
// @access public
router.post('/', [
  body('name', 'Please add your name').not().isEmpty(),
  body('password', 'Please enter a pwassword with more then 6 characters').isLength({ min: 5 }),
  body('email', 'Please enter a pwassword with more then 6 characters').isEmail().normalizeEmail()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.send('passed')
  // User.create({
  //   username: req.body.username,
  //   password: req.body.password
  // }).then(user => res.json(user));
});

module.exports = router;