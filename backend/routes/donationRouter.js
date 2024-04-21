const express = require("express");
const { addDonation , getDonations , deleteDonation } = require("../controllers/donationController");
const router = express.Router();

router.post('/addUserData', addDonation);
router.post('/viewDonations', getDonations);
router.post('/deleteDonation', deleteDonation);


module.exports=router