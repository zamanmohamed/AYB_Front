import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import {
  createTransaction,
  fetchFilteredTransactions,
} from "../redux/features/transactionSlice";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import { fetchCustomers } from "../redux/features/customerSlice";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.data);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomers({ limit: 1000 }));
  }, [dispatch]);

  // ✅ Define Yup Validation Schema
  const validationSchema = Yup.object().shape({
    transactionType: Yup.string().required("Transaction Type is required"),
    amount: Yup.number()
      .typeError("Amount must be a number")
      .positive("Amount must be positive")
      .required("Amount is required"),
    cashType: Yup.string().required("Cash Type is required"),
    customer_Id: Yup.string().required("Customer is required"),
  });

  return (
    <Formik
      initialValues={{
        transactionType: "",
        amount: 0,
        cashType: "",
        customer_Id: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(createTransaction(values))
          .unwrap()
          .then((res) => {
            resetForm();
            setSelectedCustomer(null);
            window.location.reload();
          })
          .catch((err) => {
            window.alert("Error");
          });
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="p-4 bg-light rounded shadow">
          <h2 className="mb-4">Add Transaction</h2>

          {/* Transaction Type */}
          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Transaction Type</BootstrapForm.Label>
            <Field
              as="select"
              name="transactionType"
              className={`form-control ${
                errors.transactionType && touched.transactionType
                  ? "is-invalid"
                  : ""
              }`}
            >
              <option value="">Select Category</option>
              <option value="cash_in_hand">Cash in Hand</option>
              <option value="cash_in_bank">Cash in Bank</option>
            </Field>
            <ErrorMessage
              name="transactionType"
              component="div"
              className="text-danger"
            />
          </BootstrapForm.Group>

          {/* Amount */}
          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Amount</BootstrapForm.Label>
            <Field
              name="amount"
              type="number"
              className={`form-control ${
                errors.amount && touched.amount ? "is-invalid" : ""
              }`}
            />
            <ErrorMessage
              name="amount"
              component="div"
              className="text-danger"
            />
          </BootstrapForm.Group>

          {/* Cash Type */}
          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Cash Type</BootstrapForm.Label>
            <Field
              as="select"
              name="cashType"
              className={`form-control ${
                errors.cashType && touched.cashType ? "is-invalid" : ""
              }`}
            >
              <option value="">Select Cash Type</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </Field>
            <ErrorMessage
              name="cashType"
              component="div"
              className="text-danger"
            />
          </BootstrapForm.Group>

          {/* Customer Selection with react-select */}
          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Customer</BootstrapForm.Label>
            <Select
              options={customers.map((customer) => ({
                value: customer._id,
                label: customer.name,
              }))}
              value={selectedCustomer}
              onChange={(option) => {
                setSelectedCustomer(option);
                setFieldValue("customer_Id", option ? option.value : "");
              }}
              placeholder="Select Customer"
              isClearable
              className={
                errors.customer_Id && touched.customer_Id ? "is-invalid" : ""
              }
            />
            <ErrorMessage
              name="customer_Id"
              component="div"
              className="text-danger mt-1"
            />
          </BootstrapForm.Group>

          {/* Submit Button */}
          <Button type="submit" variant="primary" className="w-100">
            Add Transaction
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default TransactionForm;
