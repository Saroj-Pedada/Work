const express = require("express");
const { addHospital, getHospitals, deleteHospital , editHospital } = require("../controllers/hospitalController");
const router = express.Router();

router.post('/addHospital', addHospital);
router.post('/deleteHospital', deleteHospital);
router.post('/getHospitals', getHospitals);


module.exports=router