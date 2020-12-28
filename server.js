const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const authenticate = require('./middleware/authenticate');

const loginRouter = require('./routes/login');
const restPassRouter = require('./routes/resetPass');


// database connection string
const uri = 'mongodb+srv://login:Hoho0IRu04Bc4Wgz@cluster0.kbjqe.mongodb.net/login?retryWrites=true&w=majority';

// connect to db
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true,
     useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Successfully connected to database');
});

// prep the server
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', loginRouter);
app.use('/', authenticate, restPassRouter);

// set up port
const PORT = process.env.PORT || 3000;

// serve up
app.listen(PORT, () => {
    console.log(`AuthServer is running on port ${PORT}`);
});