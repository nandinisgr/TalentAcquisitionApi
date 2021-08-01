const jwt = require('jsonwebtoken');
const secret = '!@#DWe$%^gge&&**';

function verifyJWT (token) {
    try {
        return jwt.verify(token, secret, (err, data) => {
            if (err)
                return [ false, err ];


            return [ true, data ];
        });
    } catch (error) {
        console.error(error);

        return false;
    }
}

module.exports = verifyJWT;

