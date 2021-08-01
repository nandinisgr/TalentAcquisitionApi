const winston = require('winston');
const jwt = require('jsonwebtoken');
const { getByName } = require('../services/userServices');

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

const userName = async (req, res) => {
    const userDetails = {
        user_name: req.body.user_name,
    };
    const getByname = await getByName(userDetails);
    if (getByname.command === 'SELECT') {
        return res.status(201)
            .json({
                statusCode: 200,
                message: 'Sucess!',
                details: getByname.rows,
                ipAddress: parseIp(req)
            });

    }
    return res.status(400)
        .json({
            statusCode: 400,
            message: getByname.detail,
            ipAddress: parseIp(req)
        });
};


module.exports = userName;
