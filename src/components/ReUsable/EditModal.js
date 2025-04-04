import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditModal = ({ show, onClose, transaction, onSave }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {transaction && (
          <Formik
            initialValues={{
              amount: transaction.amount,
              cashType: transaction.cashType,
              transactionType: transaction.transactionType,
            }}
            validationSchema={Yup.object().shape({
              amount: Yup.number()
                .required("Amount is required")
                .positive("Amount must be positive"),
              cashType: Yup.string().required("Cash Type is required"),
              transactionType: Yup.string().required(
                "Transaction Type is required"
              ),
            })}
            onSubmit={onSave}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Amount</Form.Label>
                  <Field name="amount" type="number" className="form-control" />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Cash Type</Form.Label>
                  <Field as="select" name="cashType" className="form-control">
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </Field>
                  <ErrorMessage
                    name="cashType"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Transaction Type</Form.Label>
                  <Field
                    as="select"
                    name="transactionType"
                    className="form-control"
                  >
                    <option value="cash_in_hand">Cash in Hand</option>
                    <option value="cash_in_bank">Cash in Bank</option>
                  </Field>
                  <ErrorMessage
                    name="transactionType"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Button type="submit" variant="success" className="mt-3">
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
