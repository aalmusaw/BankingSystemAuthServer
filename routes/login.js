require('dotenv').config();

const bycrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();


router.post('/login', (req, res, next) => {
    // extract email and user from user client's POST request
    const email = req.body.email;
    const password = req.body.password;
    // search for users in the database with the same email given by the client
    User.findOne({email: email})
    .then(user => {
        // if the email given matches one in the database
        if (user) {
            // check if the user unencrypted password is the same as the given one
            bycrypt.compare(password, user.password, (err, same) => {
                // if an error occur along the way, print it
                if (err) {
                    res.status(500).json({
                        error: err
                    });
                    return;
                }
                // if the password matches, generate an access token and send it to the user
                if (same) {
                    const token = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '900s'});
                    res.json({
                        message: 'Login Successful',
                        accessToken: token
                    });
                }
                // if the password does not match, let the client know
                else {
                    res.status(401).json({
                        message: 'The password given is incorrect.'
                    });
                }
            });
        }
        else {
            res.status(401).json({
                message: 'No user is associated with this email address.'
            });
        }
    })

});

module.exports = router;