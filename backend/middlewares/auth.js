const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] || req.cookies.jwt;

    if (token == null) return res.sendStatus(401); // If no token, return Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, return Forbidden
        req.user = user;
        next(); // If token is valid, proceed to the next middleware/route handler
    });
};

const authUser = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (req.user.accessLevel === 2) {
            next();
        } else {
            res.sendStatus(403); // Forbidden
        }
    });
};

const authEmployee = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (req.user.accessLevel === 1) {
            next();
        } else {
            res.sendStatus(403); // Forbidden
        }
    });
};

const authAdmin = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (req.user.accessLevel === 0) {
            next();
        } else {
            res.sendStatus(403); // Forbidden
        }
    });
};

module.exports = {
    authenticateToken,
    authUser,
    authEmployee,
    authAdmin
};