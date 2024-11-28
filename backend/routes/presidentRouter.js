const express = require('express');
const router = express.Router();

const { addPresident, getPresidents, deletePresident } = require('../controllers/presidentController');

router.post('/addPresident', addPresident);
router.post('/getPresidents', getPresidents);
router.post('/deletePresident', deletePresident);

module.exports = router;