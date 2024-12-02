const jwt = require("jsonwebtoken")
const secret = process.env.ACCESS_TOKEN_SECRET


/**
 * Create a signed JSON Web Token (JWT) for the given user object.
 * @param {Object} user The user object to be signed
 * @returns {String} A signed JWT
 */
function setUser(user) {
    return jwt.sign(user, secret);
}


/**
 * Verify the given JSON Web Token (JWT) and return the user object if valid.
 * @param {String} token The JWT to be verified
 * @returns {Object|null} The user object if the JWT is valid, otherwise `null`
 */
function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

function getIdOfUser(token) {
    if (!token) return null;
    try {
        return jwt.decode(token);
    } catch (error) {
        return null;
    }
}


module.exports = {
    setUser,
    getUser,
    getIdOfUser
}