require('dotenv').config();

const express = require('express');

const RefreshToken = require('../models/RefreshToken');

const router = express.Router();

router.delete('/logout', (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        res.sendStatus(400);
    }
    else {
        // check if the provided refresh token is in the DB
        RefreshToken.exists({token: refreshToken}, (err, matchExists) => {
            if (err) {
                res.sendStatus(500);
                return;
            }
            // if it exists, delete it from the DB and return HTTP 204
            if (matchExists) {
                RefreshToken.deleteOne({token: refreshToken}, (err)=> {
                    if (err) {
                        res.sendStatus(500);
                    }
                    else {
                        res.sendStatus(204);
                    }
                });
            }
            else {
                res.sendStatus(403);
            }
        
        
        });
    }

});

module.exports = router;