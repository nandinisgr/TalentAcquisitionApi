const winston = require('winston');
const jwt = require('jsonwebtoken');

const { insertUser } = require('../services/userServices');
const { getByphone } = require('../services/userServices');
const encryptPassword = require('../middleware/encryptPass');
const parseIp = require('../middleware/parseIp');


const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/user.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});

const userRegister = async (req, res) => {
    // get the admin details from req.body

    // using logger to record activity
    logger.info(`received register request from user with details ${req.body.email_id}`);


    // using one line promises lets encrypt the password and
    // store it in a var
    if (req.body.password) {
        var encryptedPassword = await encryptPassword(req.body.password);
        if (!encryptPassword) {
            return res.json({
                statusCode: 500,
                message: 'There is an error in encrypting password',
            });
        }
    }

    // storing all the admin data in one object to use it as a parameter
    const userDetails = {
        user_name: req.body.user_name,
        email_id: req.body.email_id,
        encryptedPassword,
    };
    const secret = '!@#DWe$%^gge&&**';
    const token = jwt.sign({ sub: req.body.email_id }, secret, {
        expiresIn: 86400, // expires in 24 hours
    });


    const addUser = await insertUser(userDetails);

    // if the insert function failed the it would return a false
    if (addUser.command === 'INSERT') {
        logger.info(`user registered`);

        return res.status(201)
            .json({ statusCode: 200,
                message: 'user registered!',
                details: [ addUser.rows,
                    {token: token,
                    ipAddress: parseIp(req)
                } ]
                 });
    }

    return res.status(400)
        .json({ statusCode: 400,
            message: addUser.detail,
            ipAddress: parseIp(req) 
        });


   
};


module.exports = userRegister;
