const express = require('express');
const router = express.Router();
const employees = require('../seed');

// Send an array of all employees
router.get('/', (req, res) => {
  res.json(employees);
});

// Send an employee with a specific ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send(`There is no employee with id ${id}.`);
  }
});

// Creates a new employee with a provided name
router.post('/', (req, res) => {
  const employee = req.body;
  if (employee && employee.id) {
    const employeeExistsAlready = employees.find((e) => e.id === employee.id);
    if (!employeeExistsAlready) {
      employees.push(employee);
      res.status(201).json(employees);
    } else {
      res.status(400).send('This player already exists.');
    }
  } else {
    res.status(400).send(`Invalid employee data: ${JSON.stringify(employee)}`);
  }
});

// Updates employee with a specific ID with the provided data

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // If the name doesn't exists, isn't a string, or is empty this error will appear
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).send('Entering a player name is required.');
  }

  // Finds the employee by their ID
  const employee = employees.findIndex((e) => e.id === +id);
  if (employee === -1) {
    return res.status(404).send(`There is no employee with id ${id}.`);
  }

  //Updates the employee's name
  employees[employee].name = name;

  //Sends the updated employee
  res.status(200).json(employees[employee]);
});

// Deletes an employee with a specific ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Finds the index of the employee by their ID
  const employee = employee.findIndex((e) => e.id === +id);

  // If the employee is not found, send the 404 error
  if (employee === -1) {
    return res.status(404).send(`There is no employee with id ${id}.`);
  }

  // REmoves the employee from the array
  employee.splice(employee, 1);

  res.status(200).send();
});

module.exports = router;
