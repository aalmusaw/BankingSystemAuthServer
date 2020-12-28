require('dotenv').config();

const bycrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken')

const router = express.Router();
const ACCESS_TOKEN_EXPIRATION_PERIOD = '1m'
const REFRESH_TOKEN_EXPIRATION_PERIOD = '2h'


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
                // if the password matches, generate access and refresh tokens and send them to the user
                if (same) {
                    const accessToken = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET,
                         {expiresIn: ACCESS_TOKEN_EXPIRATION_PERIOD});
                    const refreshToken = jwt.sign({email: user.email}, process.env.REFRESH_TOKEN_SECRET,
                         {expiresIn: REFRESH_TOKEN_EXPIRATION_PERIOD});
                    // save the refresh token into the DB
                    const refreshTokenDoc = new RefreshToken({token: refreshToken});
                    refreshTokenDoc.save();
                    res.json({
                        message: 'Login Successful',
                        accessToken: accessToken,
                        refreshToken: refreshToken
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