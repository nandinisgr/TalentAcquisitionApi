const winston = require('winston');
const jwt = require('jsonwebtoken');

const { insertDepartment } = require('../services/department');
const { removeDepartment } = require('../services/department');
const { getallDepartment } = require('../services/department');
const { updateDepartment } = require('../services/department');
const { getDepartmentCount } = require('../services/department');


const parseIp = require('../middleware/parseIp');

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/department.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});
//Add Department---------
const DepartmentRegister = async (req, res) => {
    logger.info(`received Department request  with details ${req.body.department_id}`);
    const DepartmentDetails = {
        department_name: req.body.department_name,
        roles: req.body.roles,
    };
    const secret = '!@#DWe$%^gge&&**';
    const token = jwt.sign({ sub: req.body.department_id }, secret, {
        expiresIn: 86400, // expires in 24 hours
    });

    const addDepartment = await insertDepartment(DepartmentDetails);
    if (addDepartment.command === 'INSERT') {
        logger.info(`Department Details added successfully`);

        return res.status(201)
            .json({
                statusCode: 200,
                message: 'Sucess!',
                details: [addDepartment.rows,
                {
                    token: token,
                    ipAddress: parseIp(req)
                },]
            });
    }

    return res.status(400)
        .json({
            statusCode: 400,
            message: addDepartment.detail,
            ipAddress: parseIp(req)
        });
};
//deleteDepartmentDetails------------------------
const deleteDepartmentDetails = async (req, res) => {
    const DepartmentDetails = {
        department_id: req.body.department_id,

    };
    const deletedepartment = await removeDepartment(DepartmentDetails);
    if (deletedepartment.command === 'DELETE') {
        return res.status(201)
            .json({
                statusCode: 200,
                message: 'Sucess!',
                details: deletedepartment.rows,
                ipAddress: parseIp(req)
            });
    }

    return res.status(400)
        .json({
            statusCode: 400,
            message: deletedepartment.detail,
            ipAddress: parseIp(req)
        });

};
// getallDepartmentdetails----------------------------------
const getallDepartmentdetails = async (req, res) => {
    const getDepartment = await getallDepartment();
    if (getDepartment.command === 'SELECT') {
        return res.status(201)
            .json({
                statusCode: 200,
                message: 'Sucess!',
                details: getDepartment.rows,
                ipAddress: parseIp(req)
            });
    }

    return res.status(400)
        .json({
            statusCode: 400,
            message: getDepartment.detail,
            ipAddress: parseIp(req)
        });

};
//updateDepartmentDetails-------------------
const updateDepartmentDetails = async (req, res) => {
    const DepartmentDetails = {
        department_id: req.body.department_id,
        department_name: req.body.department_name,
        roles: req.body.roles,

    };

    const updatedepartment = await updateDepartment(DepartmentDetails);
    if (updatedepartment.command === 'UPDATE') {
        return res.status(201)
            .json({
                statusCode: 200,
                message: 'Sucess!',
                details: updatedepartment.rows,
                ipAddress: parseIp(req)
            });
    }
    return res.status(400)
        .json({
            statusCode: 400,
            message: updatedepartment.detail,
            ipAddress: parseIp(req)
        });

};
//Total count of Department 
const getCountDepartmentDetails = async (req, res) => {
    const getCountdepartment = await getDepartmentCount();
    if (getCountdepartment.command === 'SELECT') {
        return res.status(201)
            .json({
                statusCode: 200,
                message: 'Sucess!',
                departmentCount: getCountdepartment.rows,
                ipAddress: parseIp(req)
            });

    }
    return res.status(400)
        .json({
            statusCode: 400,
            message: getCountdepartment.detail,
            ipAddress: parseIp(req)
        });
};


module.exports = { getCountDepartmentDetails,updateDepartmentDetails,getallDepartmentdetails,DepartmentRegister,deleteDepartmentDetails};
