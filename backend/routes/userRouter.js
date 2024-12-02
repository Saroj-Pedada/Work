const express = require('express');
const router = express.Router();
const {
    getUsers,
    getEmployees,
    getUserById,
    createUser,
    deleteUser,
    createEmployee,
    getProfile,
    changePassword
} = require('../controllers/userController.js');

module.exports = router;

router.post('/getUsers', getUsers);
router.post('/getEmployees', getEmployees);
router.post('/getUserById', getUserById);
router.post('/createUser', createUser);
router.post('/deleteUser', deleteUser);
router.post('/createEmployee', createEmployee);
router.post('/getProfile', getProfile);
router.post('/changePassword', changePassword);