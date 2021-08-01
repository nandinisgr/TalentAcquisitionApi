const verifyJWT = require('../middleware/verifyJWT');
const winston = require('winston');
const parseIp = require('../middleware/parseIp');



const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/JWT.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        logger.info(`Received ${token} as token. Authorization failed!`);

        return res.sendStatus(401); // if there isn't any token
    }

    const result = await verifyJWT(token);

    if (!result[0]) {
        logger.info(`Token: ${token} is invalid. Unauthorized!`);

        return res.json({
            statusCode: 403,
            message: result[1],
            ipAddress: parseIp(req),
        });
    }

    logger.info(`Token: ${token} is verified and authorized.`);
    next();

    return true;
};

module.exports = verifyToken;
