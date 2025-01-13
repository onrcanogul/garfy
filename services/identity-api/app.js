const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const User = require('./models/User');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = 9010;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

