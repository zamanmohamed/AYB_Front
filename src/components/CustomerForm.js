import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createCustomer } from "../redux/features/customerSlice";

const CustomerForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={Yup.object({ name: Yup.string().required("Required") })}
      onSubmit={(values, { resetForm }) => {
        dispatch(createCustomer(values))
          .unwrap()
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => {
            window.alert("Customer name already exists");
          });
      }}
    >
      <Form>
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <Field name="name" className="form-control" />
          <ErrorMessage name="name" component="div" className="text-danger" />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Customer
        </button>
      </Form>
    </Formik>
  );
};

export default CustomerForm;
