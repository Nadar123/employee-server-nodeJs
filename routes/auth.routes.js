const express = require('express');
const router = express.Router();

// @route get api/auth
// @desc get request for logging a user
// @access private
router.get('/', (req, res) => {
  res.send('register a user')
});

// @route post api/auth
// @desc post request for logging a user
// @access public
router.post('/', (req, res) => {
  res.send('log a user')
});

module.exports = router;