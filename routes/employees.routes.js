const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Employee = require('../models/Employees');


// @access private - get all employees
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

// @access private - get employee by id
router.get = ('/:id', auth, async (req, res) => {
  try {
    let employeeId = await Employee.findById(req.params.id);

    if(!employeeId) return res.status(404).json({msg: 'Employee id not found'});
    
    if(employeeId.user.toString() !== req.user.id) {
      return req.status(401).json({msg: 'Not autorized'});
    }

    res.json(employeeId);

  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
}); 



// @access private - post employee
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

// @access private - update employee
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, birthday, position } = req.body;

  // create employee object for updates
  const employeeFields = {};

  if(name) employeeFields.name = name;
  if(email) employeeFields.email = email;
  if(phone) employeeFields.phone = phone;
  if(birthday) employeeFields.birthday = birthday;
  if(position) employeeFields.position = position;

  try {
    let employee = await Employee.findById(req.params.id);

    if(!employee) return res.status(404).json({msg: 'Employee not found'});
    
    // current user own employee fields
    if(employee.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not autorized'});
    }
    employee = await Employee.findByIdAndUpdate(req.params.id, 
      {$set: employeeFields}, 
      {new: true}  
    );
    res.json(employee)
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});
// @access private - delete employee by id
router.delete('/:id', auth, async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id);

    if(!employee) return res.status(404).json({msg: 'Employee not found'});
    
    // current user own employee fields
    if(employee.user.toString() !== req.user.id) {
      return req.status(401).json({msg: 'Not autorized'});
    }

    await Employee.findByIdAndRemove(req.params.id);
    res.json({msg: 'Employee was remove'});

  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});

module.exports = router;