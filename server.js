const express = require('express');
const connectDB = require('./config/db');

const app = express();

// DB connection
connectDB();

// Middleware
app.use(express.json({extend: false}));

app.get('/', (req, res) => res.json({ msg: 'employees list API'}))

// define routes
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/employees', require('./routes/employees.routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server run on ${PORT}`));