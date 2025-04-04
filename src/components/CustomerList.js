import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../redux/features/customerSlice";

// import "./TransactionList.css";
import DataTable from "./ReUsable/DataTable";
// import DeleteModal from "./ReUsable/DeleteModal";
// import EditModal from "./ReUsable/EditModal";

const CustomerList = () => {
  const dispatch = useDispatch();
  const {
    data: customers,
    pagination,
    loading,
  } = useSelector((state) => state.customers);

  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  //   const [showDeleteModal, setShowDeleteModal] = useState(false);
  //   const [transactionToDelete, setTransactionToDelete] = useState(null);
  //   const [showEditModal, setShowEditModal] = useState(false);
  //   const [currentTransaction, setCurrentTransaction] = useState(null);

  // Update when filters change in the table
  const handleFilterChange = ({ searchText, startDate, endDate }) => {
    setSearchTerm(searchText);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    dispatch(
      fetchCustomers({
        page: currentPage,
        startDate,
        endDate,
        searchText: searchTerm,
      })
    );
  }, [dispatch, currentPage, startDate, endDate, searchTerm]);

  //   const handleDelete = () => {
  //     dispatch(deleteTransaction(currentTransaction._id));
  //     setShowDeleteModal(false);
  //   };

  //   const handleEditSave = (values) => {
  //     dispatch(
  //       updateTransaction({ id: currentTransaction._id, updatedData: values })
  //     );
  //     setShowEditModal(false);
  //   };

  //   const handleShowEditModal = (values) => {
  //     setCurrentTransaction(values);
  //     setShowEditModal(true);
  //   };

  //   const handleShowDeleteModal = (values) => {
  //     setCurrentTransaction(values);
  //     setShowDeleteModal(true);
  //   };

  const columns = [
    {
      key: "name",
      label: "Customer",
      //   render: (row) => row.customer_Id?.name || "N/A",
    },
    // {
    //   key: "amountCredit",
    //   label: "Credit",
    //   render: (row) => (row.cashType === "credit" && row.amount) || "-",
    // },
    // {
    //   key: "amountDebit",
    //   label: "Debit",
    //   render: (row) => (row.cashType === "debit" && row.amount) || "-",
    // },
  ];

  return (
    <div className="transaction-container">
      <DataTable
        tableName={"Transaction Details"}
        data={customers}
        columns={columns}
        loading={loading}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
        onEdit={() => {}}
        onDelete={() => {}}
        actionNeeded={false}
        onFilterChange={handleFilterChange}
        filterNeeded={true}
      />

      {/* <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
      />
      <EditModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        transaction={currentTransaction}
        onSave={handleEditSave}
      /> */}
    </div>
  );
};

export default CustomerList;
