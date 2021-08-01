const express = require('express');
const router = express.Router();

//User Route
const userRegister = require('../controllers/userRegistration');
const userLogin = require('../controllers/userLogin');
const userEmailID = require('../controllers/userEmailExist');
const userName = require('../controllers/userNameExist');
//department Route
const department = require('../controllers/department');
//user
const user = require('../controllers/menuUser');
//Started Api--------------------------------------------------
//user Api
router.post('/userRegister', userRegister);
router.post('/userLogin', userLogin);
router.post('/getByEmail', userEmailID);
router.post('/getByName', userName);
//Department Api
router.post('/DepartmentRegister', department.DepartmentRegister);
router.get('/getallDepartment', department.getallDepartmentdetails);
router.post('/removeDepartment', department.deleteDepartmentDetails);
router.post('/updateDepartment', department.updateDepartmentDetails);
router.get('/getDepartmentCount', department.getCountDepartmentDetails);
//Menu User Api
router.post('/MenuUserRegister', user.MenuUserRegister);
router.get('/getallUser', user.getallUserdetails);
router.post('/removeUser', user.deleteUserDetails);
router.post('/updateUser', user.updateUserDetails);
router.get('/getUserCount', user.getCounUserDetails);
module.exports = router;
