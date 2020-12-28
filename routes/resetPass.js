require('dotenv').config();

const bycrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();


router.post('/resetPass', (req, res, next) => {
    // extract email and user from user client's POST request
    const password = req.body.password;
    // encrypt the user-provided password
    bycrypt.hash(password, 10, (err, encrypted) => {
        // check for encryption error
        if (err) {
            res.status(500).json({ message: 'Hashing error: password could not be reset' });
        }
        // no encryption error
        else {
            // update by email
            const filter = { email: req.user.email };
            // update old password to encrypted password
            const update = { password: encrypted };
            // execute query
            User.findOneAndUpdate(filter, update, (err, doc, result) => {
                if (err) {
                    res.status(500).json({ message: 'Update error: password could not be reset' });
                }
                else {
                    res.json({ message: 'Password updated successfully' });
                }
            });
        }
    });
});

module.exports = router;
