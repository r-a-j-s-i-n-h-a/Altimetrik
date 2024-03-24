import React, { useState } from "react";
import axios from "axios";
import { CustomerTable } from "./customerTable";
import "../Styles/CustomerForm.css";
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

function CustomerForm() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    adharNumber: "",
    registrationDate: "",
    mobileNumber: "",
    planStatus: "",
  });
  const [planData, setPlanData] = useState({
    planName: "",
    planCost: "",
    validity: "",
  });

  const reload = (e) => {
    window.location.reload();
  };
  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    let planCost = "";
    let validity = "";
    switch (selectedPlan) {
      case "Platinum365":
        planCost = "499";
        validity = "365";
        break;
      case "Gold180":
        planCost = "299";
        validity = "180";
        break;
      case "Silver90":
        planCost = "199";
        validity = "90";
        break;
      default:
        break;
    }
    setPlanData({ planName: selectedPlan, planCost, validity });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCustomerRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/customers", {
        ...formData,
        ...planData,
      });
      console.log("Customer registered:", response.data);
      // Reset form data after successful registration
      setFormData({
        name: "",
        dob: "",
        email: "",
        adharNumber: "",
        registrationDate: "",
        mobileNumber: "",
        planStatus: "",
      });
      setPlanData({
        planName: "",
        planCost: "",
        validity: "",
      });
    } catch (error) {
      console.error("Error registering customer:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCustomerRegistration} className="customer-form">
        <h3 className="heading2">New Customer Registration</h3>
        {/* Customer registration fields */}
        <label className="form-label">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="form-input"
        />
        <br />
        <label className="form-label">Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          required
          className="form-input"
        />
        <br />
        <label className="form-label">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="form-input"
        />
        <br />
        <label className="form-label">Adhar Number:</label>
        <input
          type="text"
          maxlength="12"
          name="adharNumber"
          value={formData.adharNumber}
          onChange={handleInputChange}
          required
          className="form-input"
        />
        <br />
        <label className="form-label">Registration Date:</label>
        <input
          type="date"
          name="registrationDate"
          value={formData.registrationDate}
          onChange={handleInputChange}
          required
          className="form-input"
        />
        <br />
        <label className="form-label">Assigned Mobile Number:</label>
        <input
          type="number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          required
          pattern="[0-9]{10}"
          className="form-input"
        />
        <br />

        {/* Plan selection fields */}
        <label className="form-label">Plan Name:</label>
        <select
          name="planName"
          value={planData.planName}
          onChange={handlePlanChange}
          className="form-input"
        >
          <option>Select</option>
          <option value="Platinum365">Platinum365</option>
          <option value="Gold180">Gold180</option>
          <option value="Silver90">Silver90</option>
        </select>
        <br />
        <label className="form-label">Plan Cost:</label>
        <input
          type="number"
          name="planCost"
          value={planData.planCost}
          onChange={handleInputChange}
          readOnly
          className="form-input"
        />
        <br />
        <label className="form-label">Validity (No of Days):</label>
        <input
          type="number"
          name="validity"
          value={planData.validity}
          onChange={handleInputChange}
          readOnly
          className="form-input"
        />
        <br />
        <label className="form-label">Plan Status:</label>
        <select
          name="planStatus"
          value={formData.planStatus}
          onChange={handleInputChange}
          className="form-input"
        >
          <option>Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <br />

        <button onClick={reload} type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;
