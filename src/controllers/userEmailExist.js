const winston = require('winston');
const jwt = require('jsonwebtoken');
const { getByEmail } = require('../services/userServices');

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

const userEmailID = async (req, res) => {
    const userDetails = {
        email_id: req.body.email_id,
    };
    const getByEmailid = await getByEmail(userDetails);
    if (getByEmailid.command === 'SELECT') {
        return res.status(201)
            .json({
                statusCode: 200,
                message: 'Sucess!',
                details: getByEmailid.rows,
                ipAddress: parseIp(req)
            });

    }
    return res.status(400)
        .json({
            statusCode: 400,
            message: getByEmailid.detail,
            ipAddress: parseIp(req)
        });
};
module.exports = userEmailID;
