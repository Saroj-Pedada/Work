const express = require('express');
const router = express.Router();

const { createCamp, getCamps, deleteCamp, getCampsByVillage, getCampVillages } = require('../controllers/campController');

router.post('/createCamp', createCamp);
router.post('/getCamps', getCamps);
router.post('/deleteCamp', deleteCamp);
router.post('/getCampsByVillage', getCampsByVillage);
router.post('/getCampVillages', getCampVillages);

module.exports = router;