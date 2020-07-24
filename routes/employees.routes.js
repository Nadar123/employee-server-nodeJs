const express = require('express');
const router = express.Router();

// @desc  get employee list
// @access private
router.get('/', (req, res) => {
  res.send('get all employees');
});

// @desc  get employee list
// @access private
// router.get('/:id', (req, res) => {
//   res.send('get all employees')
// });

// @desc  post employee list
// @access private
router.post('/', (req, res) => {
  res.send('add new employee');
  console.log('heeee')
});

// put employee list
// @access private
router.put('/:id', (req, res) => {
  res.send('update single-id employee');
})

// delete employee list
// @access private
router.delete('/:id', (req, res) => {
  res.send('delete single-id employee');
})



module.exports = router;
