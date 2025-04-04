import React from "react";
import CustomerForm from "../components/CustomerForm";
import CustomerList from "../components/CustomerList";

const AddCustomer = () => {
  return (
    <div>
      <h2>Add Customer</h2>
      <CustomerForm />
      <CustomerList />
    </div>
  );
};

export default AddCustomer;
