const {
  getAllCustomers,
  createCustomer,
  getCustomerById,
  updateCustomer,
} = require("./customerController");
const customers = require("../models/customer");

jest.mock("../models/customer");

describe("Customer Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllCustomers", () => {
    test("should return all customers", () => {
      const mockCustomers = [{ id: 1, name: "John" }, { id: 2, name: "Jane" }];
      customers.getAll.mockReturnValueOnce(mockCustomers);
      const req = {};
      const res = { json: jest.fn() };
      getAllCustomers(req, res);
      expect(res.json).toHaveBeenCalledWith(mockCustomers);
    });
  });

  describe("createCustomer", () => {
    test("should create a new customer", () => {
      const newCustomer = { name: "New Customer" };
      const createdCustomer = { id: 1, name: "New Customer" };
      customers.create.mockReturnValueOnce(createdCustomer);
      const req = { body: newCustomer };
      const res = { json: jest.fn() };
      createCustomer(req, res);
      expect(res.json).toHaveBeenCalledWith(createdCustomer);
    });
  });

  describe("getCustomerById", () => {
    test("should return customer if found", () => {
      const mockCustomer = { id: 1, name: "John" };
      customers.getById.mockReturnValueOnce(mockCustomer);
      const req = { params: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn() };
      getCustomerById(req, res);
      expect(res.json).toHaveBeenCalledWith(mockCustomer);
    });

    test("should return 404 if customer not found", () => {
      customers.getById.mockReturnValueOnce(null);
      const req = { params: { id: 999 } };
      const res = { json: jest.fn(), status: jest.fn() };
      getCustomerById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Customer not found" });
    });
  });

  describe("updateCustomer", () => {
    test("should update customer if found", () => {
      const updatedCustomer = { id: 1, name: "Updated Name" };
      customers.update.mockReturnValueOnce(updatedCustomer);
      const req = { params: { id: 1 }, body: { name: "Updated Name" } };
      const res = { json: jest.fn(), status: jest.fn() };
      updateCustomer(req, res);
      expect(res.json).toHaveBeenCalledWith(updatedCustomer);
    });

    test("should return 404 if customer not found", () => {
      customers.update.mockReturnValueOnce(null);
      const req = { params: { id: 999 }, body: { name: "Updated Name" } };
      const res = { json: jest.fn(), status: jest.fn() };
      updateCustomer(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Customer not found" });
    });
  });
});
