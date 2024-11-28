const express = require('express');
const router = express.Router();

const { createHospital, getHospitals, getHospitalsByVillage, deleteHospital, getHospitalVillages } = require('../controllers/hospitalController');

router.post('/createHospital', createHospital);
router.post('/getHospitals', getHospitals);
router.post('/getHospitalsByVillage', getHospitalsByVillage);
router.post('/deleteHospital', deleteHospital);
router.post('/getHospitalVillages', getHospitalVillages);

module.exports = router;