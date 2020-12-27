const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = decodedToken;
        next();
    }
    catch(err) {
        res.json({
            message: 'Authentication failed.'
        });
        res.sendStatus(403);
    }
};

module.exports = authenticate;