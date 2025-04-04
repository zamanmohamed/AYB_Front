import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddTransaction from "./pages/AddTransaction";
import AddCustomer from "./pages/AddCustomer";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="nav">
          <Link className="nav-link" to="/add-transaction">
            Add Transaction
          </Link>
          <Link className="nav-link" to="/add-customer">
            Add Customer
          </Link>
        </nav>

        <Routes>
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/" element={<AddTransaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
