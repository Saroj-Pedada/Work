const express = require("express");
const { addRegistration , getRegistrations } = require("../controllers/registrationController");
const router = express.Router();

router.post('/addUserData', addRegistration);
router.post('/viewRegistrations', getRegistrations);


module.exports=router