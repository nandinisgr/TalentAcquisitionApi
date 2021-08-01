const winston = require('winston');
const jwt = require('jsonwebtoken');

const { insertUser } = require('../services/menuUser');
const { removeUser } = require('../services/menuUser');
const { getallUser } = require('../services/menuUser');
const { updateUser } = require('../services/menuUser');
const { getUserCount } = require('../services/menuUser');
const parseIp = require('../middleware/parseIp');

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/menuUser.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});
//Add MenuUser---------
const MenuUserRegister = async (req, res) => {
    logger.info(`received Department request  with details ${req.body.menuuser_id}`);
    const menuUserDetails = {
        user_name: req.body.user_name,
        department_name: req.body.department_name,
        email_id: req.body.email_id,
        address: req.body.address,
    };
    const secret = '!@#DWe$%^gge&&**';
    const token = jwt.sign({ sub: req.body.menuuser_id }, secret, {
        expiresIn: 86400, // expires in 24 hours
    });

    const addUser = await insertUser(menuUserDetails);
    if (addUser.command === 'INSERT') {
        logger.info(`User Details added successfully`);

        return res.status(201)
            .json({
                statusCode: 200,
                message: 'Sucess!',
                details: [addUser.rows,
                {
                    token: token,
                    ipAddress: parseIp(req)
                },]
            });
    }

    return res.status(400)
        .json({
            statusCode: 400,
            message: addUser.detail,
            ipAddress: parseIp(req)
        });
};
//deleteUserDetails------------------------
const deleteUserDetails = async (req, res) => {
    const menuUserDetails = {
        menuuser_id: req.body.menuuser_id,

    };
    const deleteuser = await removeUser(menuUserDetails);
    if (deleteuser.command === 'DELETE') {
        return res.status(201)
            .json({
                statusCode: 200,
                message: 'Sucess!',
                details: deleteuser.rows,
                ipAddress: parseIp(req)
            });
    }

    return res.status(400)
        .json({
            statusCode: 400,
            message: deleteuser.detail,
            ipAddress: parseIp(req)
        });

};
// getallUser----------------------------------
const getallUserdetails = async (req, res) => {
    const getUser = await getallUser();
    if (getUser.command === 'SELECT') {
        return res.status(201)
            .json({
                statusCode: 200,
                message: 'Sucess!',
                details: getUser.rows,
                ipAddress: parseIp(req)
            });
    }

    return res.status(400)
        .json({
            statusCode: 400,
            message: getUser.detail,
            ipAddress: parseIp(req)
        });

};
//updateUserDetails-------------------
const updateUserDetails = async (req, res) => {
    const menuUserDetails = {
        menuuser_id: req.body.menuuser_id,
        user_name: req.body.user_name,
        department_name: req.body.department_name,
        email_id: req.body.email_id,
        address: req.body.address,

    };

    const updateuser = await updateUser(menuUserDetails);
    if (updateuser.command === 'UPDATE') {
        return res.status(201)
            .json({
                statusCode: 200,
                message: 'Sucess!',
                details: updateuser.rows,
                ipAddress: parseIp(req)
            });
    }
    return res.status(400)
        .json({
            statusCode: 400,
            message: updateuser.detail,
            ipAddress: parseIp(req)
        });

};
//Total count of User 
const getCounUserDetails = async (req, res) => {
    const getCountuser = await getUserCount();
    if (getCountuser.command === 'SELECT') {
        return res.status(201)
            .json({
                statusCode: 200,
                message: 'Sucess!',
                userCount: getCountuser.rows,
                ipAddress: parseIp(req)
            });

    }
    return res.status(400)
        .json({
            statusCode: 400,
            message: getCountuser.detail,
            ipAddress: parseIp(req)
        });
};


module.exports = { getCounUserDetails, updateUserDetails, getallUserdetails, MenuUserRegister, deleteUserDetails };
