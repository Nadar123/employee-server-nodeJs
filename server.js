const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ msg: 'employees list API'}))

// define routes
app.use('/api/user', require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/employees', require('./routes/employees.routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server run on ${PORT}`));