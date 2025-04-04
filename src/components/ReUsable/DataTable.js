import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Spinner,
  Pagination,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const DataTable = ({
  tableName,
  data,
  columns,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  actionNeeded,
  onFilterChange,
  filterNeeded,
}) => {
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Send filters to parent component
  useEffect(() => {
    if (onFilterChange && filterNeeded) {
      onFilterChange({ searchText, startDate, endDate });
    }
  }, [searchText, startDate, endDate]);

  return (
    <Container>
      <h3 className="mb-4 text-center">{tableName}</h3>
      {filterNeeded && (
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="searchInput">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button
              variant="secondary"
              onClick={() => {
                setSearchText("");
                setStartDate("");
                setEndDate("");
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      )}

      {/* Loading Spinner */}
      {loading && (
        <Spinner
          animation="border"
          role="status"
          className="d-block mx-auto my-3"
        />
      )}

      {/* Data Table */}
      <Table bordered hover className="text-center">
        <thead className="table-dark">
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {actionNeeded && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row._id}>
                {columns.map((col) => (
                  <td key={`${row._id}-${col.key}`}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {actionNeeded && (
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => onEdit(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(row)}
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination className="justify-content-center">
        <Pagination.First
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Container>
  );
};

export default DataTable;
