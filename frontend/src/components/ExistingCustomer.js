import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/ExistingCustomer.css';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api'
});

function ExistingCustomers() {
  const [user, setUser] = useState({
    id: 1,
    name: "Raj",
    dob: "2002-05-02",
    email: "raj@gmail.com",
    adharNumber: "765757557575",
    registrationDate: "2024-03-23",
    mobileNumber: "5436436465",
    planStatus: "Inactive",
    planName: "Gold180",
    planCost: "299",
    validity: "180"
  });

  const [renewalDate, setRenewalDate] = useState('');
  const [planStatus, setPlanStatus] = useState(user.planStatus);
  const [existingPlanName, setExistingPlanName] = useState(user.planName);
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanCost, setNewPlanCost] = useState('');
  const [newValidity, setNewValidity] = useState('');
  const [upgradeDowngradePlanStatus, setUpgradeDowngradePlanStatus] = useState(user.planStatus);
  const [customerTableBefore, setCustomerTableBefore] = useState([]);
  const [customerTableAfter, setCustomerTableAfter] = useState([]);
  useEffect(() => {
    fetchCustomerTable();
  }, []);

  const fetchCustomerTable = async () => {
    try {
      const response = await apiClient.get('/customers');
      const customerTable = response.data;
      setCustomerTableBefore(customerTable);
    } catch (error) {
      console.error('Error fetching customer table:', error);
    }
  };

  const handleRenewPlan = async () => {
    try {
      const response = await apiClient.put(`/customers/${user.id}`, { renewalDate, planStatus });
      console.log('Plan renewed successfully:', response.data);
      fetchCustomerTable();
    } catch (error) {
      console.error('Error renewing plan:', error);
    }
  };

  const handleUpgradeDowngradePlan = async () => {
    try {
      const response = await apiClient.put(`/customers/${user.id}`, {
        existingPlanName,
        newPlanName,
        newPlanCost,
        newValidity,
        planStatus: upgradeDowngradePlanStatus
      });
      console.log('Plan upgraded/downgraded successfully:', response.data);
      fetchCustomerTable();
    } catch (error) {
      console.error('Error upgrading/downgrading plan:', error);
    }
  };


  return (
    <>
    <div className="existing-customers-container">
      <h2 className="existing-customers-heading">Hi {user.name}! Welcome back. Here you can renew and make changes to your plans.</h2>

      {/* Renew Plan */}
      <h3>Renew Plan</h3>
      <form onSubmit={handleUpgradeDowngradePlan} className="existing-customers-form">
        <label className="existing-customers-label">Renewal Date:</label>
        <input type="date" value={renewalDate} onChange={(e) => setRenewalDate(e.target.value)} className="existing-customers-input" />
        <br />

        {/* Upgrade/Downgrade Plan */}
        <h3>Upgrade/Downgrade Plan</h3>
        <label className="existing-customers-label">Existing Plan Name:</label>
        <input type="text" value={existingPlanName} readOnly className="existing-customers-input" />
        <br />
        <label className="existing-customers-label">New Plan Name:</label>
        <input type="text" value={newPlanName} onChange={(e) => setNewPlanName(e.target.value)} className="existing-customers-input" />
        <br />
        <label className="existing-customers-label">New Plan Cost:</label>
        <input type="number" value={newPlanCost} onChange={(e) => setNewPlanCost(e.target.value)} className="existing-customers-input" />
        <br />
        <label className="existing-customers-label">New Validity:</label>
        <input type="number" value={newValidity} onChange={(e) => setNewValidity(e.target.value)} className="existing-customers-input" />
        <br />
        <label className="existing-customers-label">Plan Status:</label>
        <select value={upgradeDowngradePlanStatus} onChange={(e) => setUpgradeDowngradePlanStatus(e.target.value)} className="existing-customers-select">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <br />
        <button type="submit" className="existing-customers-submit-btn">Make Changes</button>
      </form>

      
    </div>
    {/* Customer Table */}
    <h3 className='heading'>Customer Table</h3>
    <div className="customer-table-container">
      <table className="customer-table">
        <thead>
          <tr className="customer-table-header">
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Adhar Number</th>
            <th>Registration Date</th>
            <th>Mobile Number</th>
            <th>Plan Status</th>
            <th>Plan Name</th>
            <th>Plan Cost</th>
            <th>Validity</th>
          </tr>
        </thead>
        <tbody>
          <tr className="customer-table-row">
            <td className="customer-table-cell">{user.id}</td>
            <td className="customer-table-cell" >{user.name}</td>
            <td className="customer-table-cell">{user.dob}</td>
            <td className="customer-table-cell">{user.email}</td>
            <td className="customer-table-cell" >{user.adharNumber}</td>
            <td className="customer-table-cell">{user.registrationDate}</td>
            <td className="customer-table-cell">{user.mobileNumber}</td>
            <td className="customer-table-cell">{planStatus}</td>
            <td className="customer-table-cell">{existingPlanName}</td>
            <td className="customer-table-cell">{newPlanCost}</td>
            <td className="customer-table-cell">{newValidity}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </>
  );
}

export default ExistingCustomers;

