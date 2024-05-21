import React, { useState } from "react";
import { Button, Input, Popconfirm, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { createAntTag } from "../../../ultils/tagUtils";
import LayoutTable from "./LayoutTable";
import { formatDate } from "../../../components/MomentDate";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const StaffTable = ({ dataSource, onSave, onDelete, onEdit }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? <span>{text}</span> : text,
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [columns.map((col) => col.title)],
      body: dataSource.map((row) =>
        columns.map((col) => {
          if (col.dataIndex === "gender") {
            let color = row[col.dataIndex] === "Male" ? "#f50" : "#108ee9";
            return createAntTag(row[col.dataIndex], color).props.children;
          }
          if (col.dataIndex === "birthday" || col.dataIndex === "start_date") {
            return formatDate(row[col.dataIndex]);
          }
          return row[col.dataIndex];
        })
      ),
    });
    doc.save("staff-table.pdf");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      dataSource.map((row) => {
        let formattedRow = {};
        columns.forEach((col) => {
          if (col.dataIndex === "gender") {
            formattedRow[col.title] = row[col.dataIndex];
          } else if (
            col.dataIndex === "birthday" ||
            col.dataIndex === "start_date"
          ) {
            formattedRow[col.title] = formatDate(row[col.dataIndex]);
          } else {
            formattedRow[col.title] = row[col.dataIndex];
          }
        });
        return formattedRow;
      })
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Staff Table");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "staff-table.xlsx"
    );
  };

  const defaultColumns = [
    {
      title: "ID",
      dataIndex: "staff_id",
      editable: false,
      sorter: (a, b) => a.staff_id - b.staff_id,
    },
    {
      title: "Name",
      dataIndex: "staff_name",
      editable: false,
      ...getColumnSearchProps("staff_name"),
      sorter: (a, b) => a.staff_name.localeCompare(b.staff_name),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      editable: true,
      render: (text) => {
        let color = text === "Male" ? "#f50" : "#108ee9";
        return createAntTag(text, color);
      },
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      ...getColumnSearchProps("gender"),
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      editable: false,
      render: (text) => (text ? formatDate(text) : "N/A"),
      sorter: (a, b) => new Date(a.birthday) - new Date(b.birthday),
    },
    {
      title: "Address",
      dataIndex: "address",
      editable: true,
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      editable: true,
      ...getColumnSearchProps("phone_number"),
      sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: false,
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Position",
      dataIndex: "position",
      editable: false,
      ...getColumnSearchProps("position"),
      sorter: (a, b) => a.position.localeCompare(b.position),
    },
    {
      title: "Salary",
      dataIndex: "salary",
      editable: false,
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      editable: false,
      render: (text) => (text ? formatDate(text) : "N/A"),
      sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: 200,
          }}
        >
          <Button
            onClick={() => onEdit(record.staff_id)}
            style={{ backgroundColor: "#4CAF50", color: "white" }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.staff_id)}
          >
            <Button style={{ backgroundColor: "#f44336", color: "white" }}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEditCell = (staff_id) => {
    console.log("Edit item with ID:", staff_id);
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        onSave,
        onEdit: handleEditCell,
      }),
    };
  });

  return (
    <>
      <Button
        onClick={exportToPDF}
        style={{ marginBottom: 16, marginRight: 8 }}
      >
        Export to PDF
      </Button>
      <Button onClick={exportToExcel} style={{ marginBottom: 16 }}>
        Export to Excel
      </Button>
      <LayoutTable
        dataSource={dataSource}
        columns={columns}
        onSave={onSave}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </>
  );
};

export default StaffTable;
