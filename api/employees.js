const express = require('express');
const router = express.Router();
module.exports = router;

// Use Prisma for database operations
const prisma = require('../prisma');

// Send an array of all employees
router.get('/', async (req, res, next) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (e) {
    next(e);
  }
});

// Send an employee with a specific ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: +id },
    });

    if (employee) {
      res.json(employee);
    } else {
      res.status(404).send(`There is no employee with id ${id}.`);
    }
  } catch (e) {
    next(e);
  }
});

// Creates a new employee with a provided name
router.post('/', async (req, res, next) => {
  const { id, name } = req.body;

  try {
    if (name && typeof name === 'string' && name.trim() !== '') {
      const employeeExistsAlready = await prisma.employee.findUnique({
        where: { id: id },
      });

      if (!employeeExistsAlready) {
        const newEmployee = await prisma.employee.create({
          data: { id, name },
        });
        res.status(201).json(newEmployee);
      } else {
        res.status(400).send('This employee already exists.');
      }
    } else {
      res
        .status(400)
        .send(`Invalid employee data: ${JSON.stringify(req.body)}`);
    }
  } catch (e) {
    next(e);
  }
});

// Updates employee with a specific ID with the provided data
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).send('A valid employee name is required.');
    }

    const employee = await prisma.employee.findUnique({
      where: { id: +id },
    });

    if (!employee) {
      return res.status(404).send(`There is no employee with id ${id}.`);
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id: +id },
      data: { name },
    });

    res.status(200).json(updatedEmployee);
  } catch (e) {
    next(e);
  }
});

// Deletes an employee with a specific ID
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: +id },
    });

    if (!employee) {
      return res.status(404).send(`There is no employee with id ${id}.`);
    }

    await prisma.employee.delete({
      where: { id: +id },
    });

    res.status(204).send(); // Use 204 No Content for successful deletion
  } catch (e) {
    next(e);
  }
});
