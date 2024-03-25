const fs = require("fs");
const path = require("path");
const customers = require("./customers");

jest.mock("fs");

// Sample data for testing
const sampleCustomers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

// Mock data file path
const dataFilePath = path.join(__dirname, "..", "data", "customers.json");

describe("customers module", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    test("should return all customers", () => {
      fs.readFileSync.mockReturnValueOnce(JSON.stringify(sampleCustomers));
      const result = customers.getAll();
      expect(result).toEqual(sampleCustomers);
    });
  });

  describe("getById", () => {
    test("should return customer by id", () => {
      fs.readFileSync.mockReturnValueOnce(JSON.stringify(sampleCustomers));
      const result = customers.getById(1);
      expect(result).toEqual(sampleCustomers[0]);
    });

    test("should return null if customer with given id does not exist", () => {
      fs.readFileSync.mockReturnValueOnce(JSON.stringify(sampleCustomers));
      const result = customers.getById(3);
      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    test("should create a new customer", () => {
      fs.readFileSync.mockReturnValueOnce(JSON.stringify(sampleCustomers));
      const newCustomer = { name: "New Customer" };
      const expectedCustomer = { id: 3, name: "New Customer" };
      const result = customers.create(newCustomer);
      expect(result).toEqual(expectedCustomer);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        dataFilePath,
        JSON.stringify([...sampleCustomers, expectedCustomer], null, 2)
      );
    });
  });

});
