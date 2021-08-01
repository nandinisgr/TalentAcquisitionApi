const jwt = require('jsonwebtoken');
const { getUser } = require('../services/userServices');
const Bcrypt = require('bcrypt');
const winston = require('winston');

const parseIp = require('../middleware/parseIp');

// create th logger object
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/userLogin.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});


const userLogin = async (req, res) => {
    const result = await getUser(req.body.email_id);
    const secret = '!@#DWe$%^gge&&**';

    // console.log(result);


    if (!result.rowCount) {
        console.log('No user found');
        logger.info(`User with given details not found in database`);

        return res.json({ statusCode: 400,
            message: 'Invalid UserName/Password' });
    }

    // if rowCount > 0 .i.e if any user was matched

    console.log('user found');
    logger.info(`user with given details is found in the database!`);

    // since a user was found lets check if the passwords match
    return await Bcrypt.compare(req.body.password, result.rows[0].password).then(
        onfullfilled => {
            console.log(onfullfilled);
            if (onfullfilled) {
                console.log('User authenticated');
                logger.info('passwords matched!, User authenticated !');

                const token = jwt.sign({ sub: req.body.email_id }, secret, {
                    expiresIn: 86400, // expires in 24 hours
                });

                // res.statusCode(200);

                logger.info('user authorized!, 200');

                return res.json({
                    statusCode: 200,
                    message: 'User authorized',
                    details:result.rows,
                    Token: token,
                    ipAddress: parseIp(req)
                });
            }
            logger.info('user unauthorized!, 401');

            return res.json({ statusCode: 401,
                error: 'User unauthorized',
                msg: 'invalid password',
                ipAddress: parseIp(req)
            });
        },
    );
};

module.exports = userLogin;
