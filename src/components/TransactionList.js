import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredTransactions,
  deleteTransaction,
  updateTransaction,
} from "../redux/features/transactionSlice";

// import "./TransactionList.css";
import DataTable from "./ReUsable/DataTable";
import DeleteModal from "./ReUsable/DeleteModal";
import EditModal from "./ReUsable/EditModal";

const TransactionList = () => {
  const dispatch = useDispatch();
  const {
    data: transactions,
    pagination,
    loading,
  } = useSelector((state) => state.transactions);

  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  // Update when filters change in the table
  const handleFilterChange = ({ searchText, startDate, endDate }) => {
    setSearchTerm(searchText);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    dispatch(
      fetchFilteredTransactions({
        page: currentPage,
        startDate,
        endDate,
        searchText: searchTerm,
      })
    );
  }, [dispatch, currentPage, startDate, endDate, searchTerm]);

  const handleDelete = () => {
    dispatch(deleteTransaction(currentTransaction._id))
      .unwrap()
      .then((res) => {
        setShowDeleteModal(false);
        window.location.reload();
      })
      .catch((err) => {
        window.alert("Error");
      });
  };

  const handleEditSave = (values) => {
    dispatch(
      updateTransaction({ id: currentTransaction._id, updatedData: values })
    )
      .unwrap()
      .then((res) => {
        setShowEditModal(false);
        window.location.reload();
      })
      .catch((err) => {
        window.alert("Error");
      });
  };

  const handleShowEditModal = (values) => {
    setCurrentTransaction(values);
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (values) => {
    setCurrentTransaction(values);
    setShowDeleteModal(true);
  };

  const columns = [
    {
      key: "customer_Id.name",
      label: "Customer",
      render: (row) => row.customer_Id?.name || "N/A",
    },
    {
      key: "amountCredit",
      label: "Credit",
      render: (row) => (row.cashType === "credit" && row.amount) || "-",
    },
    {
      key: "amountDebit",
      label: "Debit",
      render: (row) => (row.cashType === "debit" && row.amount) || "-",
    },
  ];

  return (
    <div className="transaction-container">
      <DataTable
        tableName={"Transaction Details"}
        data={transactions}
        columns={columns}
        loading={loading}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
        onEdit={handleShowEditModal}
        onDelete={handleShowDeleteModal}
        actionNeeded={true}
        onFilterChange={handleFilterChange}
        filterNeeded={true}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
      />
      <EditModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        transaction={currentTransaction}
        onSave={handleEditSave}
      />
    </div>
  );
};

export default TransactionList;
