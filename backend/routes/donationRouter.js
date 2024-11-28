const express = require('express');
const router = express.Router();

const { getDonations, addDonation, deleteDonation } = require('../controllers/donationController.js');

router.post('/getDonations', getDonations);
router.post('/addDonation', addDonation);
router.post('/deleteDonation', deleteDonation);

module.exports = router;