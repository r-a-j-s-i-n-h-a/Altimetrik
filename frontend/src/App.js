import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerForm from "./components/CustomerForm";
import CustomerTable from "./components/customerTable";
import ExistingCustomer from "./components/ExistingCustomer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<ExistingCustomer />} />
        <Route
          path="/registration"
          element={
            <>
              <CustomerForm />
              <CustomerTable />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
