import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import LossProfitCard from "../components/ReUsable/LossProfitCard";
import { fetchProfitLossCompany } from "../redux/features/transactionSlice";
import { useDispatch, useSelector } from "react-redux";

const AddTransaction = () => {
  const dispatch = useDispatch();
  const profitOrLoss = useSelector((state) => state.transactions.profitOrLoss);

  useEffect(() => {
    dispatch(fetchProfitLossCompany());
  }, [dispatch]);

  return (
    <Container>
      {/* Transaction Form */}
      <Row className="justify-content-center">
        <Col md={8}>
          <h3 className="mb-4 text-center">Add Transaction</h3>
          <TransactionForm />
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <LossProfitCard data={profitOrLoss} />
        </Col>
      </Row>

      {/* Transaction List */}
      <Row className="mt-5">
        <Col>
          <TransactionList />
        </Col>
      </Row>
    </Container>
  );
};

export default AddTransaction;
