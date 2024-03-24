import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/CustomerTable.css';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api'
});

function CustomerTable() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await apiClient.get('/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>
     <h2 className='heading'> All Customer Details</h2>
    <div className="customer-table-container">
     
      <table className="customer-table">
        <thead>
          <tr className="customer-table-header">
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Adhar Number</th>
            <th>Registration Date</th>
            <th>Mobile Number</th>
            <th>Plan Name</th>
            <th>Plan Cost</th>
            <th>Validity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id} className="customer-table-row">
              <td className="customer-table-cell" data-label="Name">{customer.name}</td>
              <td className="customer-table-cell" data-label="Date of Birth">{customer.dob}</td>
              <td className="customer-table-cell" data-label="Email">{customer.email}</td>
              <td className="customer-table-cell" data-label="Adhar Number">{customer.adharNumber}</td>
              <td className="customer-table-cell" data-label="Registration Date">{customer.registrationDate}</td>
              <td className="customer-table-cell" data-label="Mobile Number">{customer.mobileNumber}</td>
              <td className="customer-table-cell" data-label="Plan Name">{customer.planName}</td>
              <td className="customer-table-cell" data-label="Plan Cost">{customer.planCost}</td>
              <td className="customer-table-cell" data-label="Validity">{customer.validity}</td>
              <td className="customer-table-cell" data-label="Status">{customer.planStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default CustomerTable;
