const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "..", "data", "customers.json");

const customers = {
  getAll() {
    const rawData = fs.readFileSync(dataFilePath);
    return JSON.parse(rawData);
  },

  getById(id) {
    const allCustomers = this.getAll();
    return allCustomers.find((customer) => customer.id === parseInt(id));
  },

  create(newCustomer) {
    const allCustomers = this.getAll();
    const lastCustomerId =
      allCustomers.length > 0 ? allCustomers[allCustomers.length - 1].id : 0;
    const createdCustomer = { id: lastCustomerId + 1, ...newCustomer };
    allCustomers.push(createdCustomer);
    fs.writeFileSync(dataFilePath, JSON.stringify(allCustomers, null, 2));
    return createdCustomer;
  },

  update(id, updatedCustomerData) {
    const allCustomers = this.getAll();
    const index = allCustomers.findIndex(
      (customer) => customer.id === parseInt(id)
    );
    if (index !== -1) {
      const updatedCustomer = {
        ...allCustomers[index],
        ...updatedCustomerData,
      };
      allCustomers[index] = updatedCustomer;
      fs.writeFileSync(dataFilePath, JSON.stringify(allCustomers, null, 2));
      return updatedCustomer;
    } else {
      return null;
    }
  },

  delete(id) {
    const allCustomers = this.getAll();
    const index = allCustomers.findIndex(
      (customer) => customer.id === parseInt(id)
    );
    if (index !== -1) {
      const deletedCustomer = allCustomers.splice(index, 1)[0];
      fs.writeFileSync(dataFilePath, JSON.stringify(allCustomers, null, 2));
      return deletedCustomer;
    } else {
      return null;
    }
  },
};

module.exports = customers;
