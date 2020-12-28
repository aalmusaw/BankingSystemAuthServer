const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {

        const accessToken = req.headers.authorization.split(' ')[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=> {
            if (err) {
                res.status(403).json({
                    message: 'Authentication failed.'
                });
            }
            else {
                req.user = decoded;
                next();
            }
        });
};

module.exports = authenticate;