const customers = require("../models/customer");

exports.getAllCustomers = (req, res) => {
  const allCustomers = customers.getAll();
  res.json(allCustomers);
};

exports.createCustomer = (req, res) => {
  const newCustomer = req.body;
  const createdCustomer = customers.create(newCustomer);
  res.json(createdCustomer);
};

exports.getCustomerById = (req, res) => {
  const customerId = req.params.id;
  const customer = customers.getById(customerId);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ error: "Customer not found" });
  }
};

exports.updateCustomer = (req, res) => {
  const customerId = req.params.id;
  const updatedCustomerData = req.body;
  const updatedCustomer = customers.update(customerId, updatedCustomerData);
  if (updatedCustomer) {
    res.json(updatedCustomer);
  } else {
    res.status(404).json({ error: "Customer not found" });
  }
};
