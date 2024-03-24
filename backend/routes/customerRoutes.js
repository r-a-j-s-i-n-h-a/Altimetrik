const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// routes
router.get('/', customerController.getAllCustomers);
router.post('/', customerController.createCustomer);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', customerController.updateCustomer);

module.exports = router;
