require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const authenticate = require('./middleware/authenticate');

const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const refreshTokenRouter = require('./routes/refreshToken');
const restPassRouter = require('./routes/resetPass');


// database connection string
const URI = process.env.DB_CONNECTION_URI;

// database configurations
const DB_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
};

// connect to db
mongoose.connect(URI, DB_CONFIG);
mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', () => {
    console.log('Successfully connected to database');
});

// prep the server
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', loginRouter);
app.use('/', logoutRouter);
app.use('/', refreshTokenRouter);
app.use('/', authenticate, restPassRouter);

// set up port
const PORT = process.env.PORT || 3000;

// serve up
app.listen(PORT, () => {
    console.log(`AuthServer is running on port ${PORT}`);
});