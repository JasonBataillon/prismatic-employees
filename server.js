const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/books', require('./api/employees'));

// Prints this message when the main directory is sent a request
app.get('/', (req, res) => {
  res.send('Welcome to the Prismatic Employees API.');
});

// Reroutes all requests for employee to the router in api/employees.js
app.use('/employees', require('./api/employees'));

// Sends a 404 error if the route is put in incorrectly
app.use((req, res, next) => {
  res.status(404).send('Route not found.');
});

// This is the default error middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? 'Something went wrong!');
});

// Tells what port is being listened to
app.listen(PORT, () => {
  `Listening on port ${PORT}...`;
});
