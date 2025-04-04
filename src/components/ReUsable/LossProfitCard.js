import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const LossProfitCard = ({ data }) => {
  return (
    <div className="bg-light p-3">
      <Card className="text-center">
        <Card.Body>
          <Card.Title className="display-4">{data}</Card.Title>
          <Card.Text className="lead">Total Balance</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LossProfitCard;
