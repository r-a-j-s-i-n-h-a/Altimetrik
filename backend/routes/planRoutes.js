
const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

router.post('/', planController.choosePlan);

module.exports = router;