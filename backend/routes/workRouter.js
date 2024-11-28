const express = require('express');
const router = express.Router();

const { registerWork, getWorks, deleteWork, getWorksById } = require('../controllers/workController');

router.post('/registerWork', registerWork);
router.post('/getWorks', getWorks);
router.post('/deleteWork', deleteWork);
router.post('/getWorksById', getWorksById);

module.exports = router;