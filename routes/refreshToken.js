require('dotenv').config();

const bycrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const RefreshToken = require('../models/RefreshToken');

const router = express.Router();
const ACCESS_TOKEN_EXPIRATION_PERIOD = '10s'

router.post('/refreshToken', (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        res.sendStatus(400);
    }
    else {
        // check if the provided refresh token is in the DB
        RefreshToken.exists({token: refreshToken}, (err, matchExists) {
            if (err) {
                res.sendStatus(500);
                return;
            }
            if (matchExists) {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) {
                        res.sendStatus(401);
                    }
                    else {
                        const accessToken = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET,
                             {expiresIn: ACCESS_TOKEN_EXPIRATION_PERIOD});
                        res.json({
                            accessToken: accessToken
                        });
                    }
                });
            }
            else {
                res.sendStatus(403);
            }
        
        
        });
    }

});