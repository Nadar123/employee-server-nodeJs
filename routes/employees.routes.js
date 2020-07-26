const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Employee = require('../models/Employees');

// @desc  get employee list
// @access private
router.get('/', auth, async (req, res) => {
  try {
    // const employee = await find().sort({date: -1});
    const employees = await Employee.find({user: req.user.id}).sort({date: -1});
    res.json(employees);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('get server error')
  }
});

// @desc  get employee list
// @access private
// router.get('/:id', (req, res) => {
//   res.send('get all employees')
// });

// @desc  post employee list
// @access private
router.post('/', [auth, [
  body('name', 'Name is reduired').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, phone, birthday, position } = req.body;
  try {
    const newEmployee = new Employee({
      name, 
      email, 
      phone, 
      birthday, 
      position, 
      user: req.user.id 
    });

    const employee = await newEmployee.save();
    res.json(employee);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Post server error')
  }

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


// router.post(
//   '/',
//   [
//     auth,
//     [
//       check('name', 'Name is required')
//         .not()
//         .isEmpty(),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({errors: errors.array()});
//     }

//     const {name, email, phone, type} = req.body;

//     try {
//       const newContact = new Contact({
//         name,
//         email,
//         phone,
//         type,
//         user: req.user.id,
//       });

//       const contact = await newContact.save();

//       res.json(contact);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   },
// );