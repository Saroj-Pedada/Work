const express = require("express");
const { addCamp, getCamps, deleteCamp , editCamp } = require("../controllers/campController");
const router = express.Router();

router.post('/addCamp', addCamp);
router.post('/deleteCamp', deleteCamp);
router.post('/getCamps', getCamps);


module.exports=router