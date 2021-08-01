const bcrypt = require('bcrypt');

function encryptPassword (password) {
    try {
        return bcrypt.hash(password, 10)
            .then(hash => hash,
                error => {
                    console.log(error);

                    return false;
                });
    } catch (error) {
        console.log(error);

        return false;
    }
}

module.exports = encryptPassword;
