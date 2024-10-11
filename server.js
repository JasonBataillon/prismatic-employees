const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Prismatic Employees API.');
});

app.use('/employees', require('./api/employees'));

app.use((req, res, next) => {
  res.status(404).send('Route not found.');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? 'Something went wrong!');
});

app.listen(PORT, () => {
  `Listening on port ${PORT}...`;
});
