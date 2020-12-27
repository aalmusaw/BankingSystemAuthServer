const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User')

const loginRouter = require('./routes/login');

// database connection string
const uri = 'mongodb+srv://login:Hoho0IRu04Bc4Wgz@cluster0.kbjqe.mongodb.net/login?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Successfully connected to database');
});

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', loginRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`AuthServer is running on port ${PORT}`);
});