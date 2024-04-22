const express = require("express");
const { addRegistration , getRegistrations , deleteRegistration } = require("../controllers/registrationController");
const router = express.Router();

router.post('/addUserData', addRegistration);
router.post('/viewRegistrations', getRegistrations);
router.post('/deleteRegistration', deleteRegistration);

module.exports=router