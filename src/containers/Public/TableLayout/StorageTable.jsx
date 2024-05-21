import React, { useState, useRef } from "react";
import { Button, Menu, Dropdown, Input, Popconfirm } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { formatDate } from "../../../components/MomentDate";
import { createAntTag } from "../../../ultils/tagUtils";
import LayoutTable from "./LayoutTable";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import jspdf-autotable
import html2canvas from "html2canvas";

const StorageTable = ({ dataSource, onSave, onDelete, onEdit }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const tableWrapperRef = useRef(null); // Create a ref for the table wrapper div

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

  const defaultColumns = [
    {
      title: "ID",
      dataIndex: "storage_id",
      editable: false,
    },
    {
      title: "Name",
      dataIndex: "goods_name",
      width: "20%",
      editable: true,
      ...getColumnSearchProps("goods_name"),
    },
    {
      title: "Arrival Date",
      dataIndex: "arrival_date",
      editable: false,
      render: (text) => {
        return text ? formatDate(text) : "N/A";
      },
    },
    {
      title: "Price",
      dataIndex: "cost_price",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      editable: true,
    },
    {
      title: "Unit",
      dataIndex: "goods_unit",
      editable: true,
      render: (text) => {
        let color = text === "kilogram" ? "#f50" : "#108ee9";
        return createAntTag(text, color);
      },
    },
    {
      title: "Created by",
      dataIndex: "created_by",
      editable: false,
    },
    {
      title: "Equipmenttype ID",
      dataIndex: "equipmenttype_id",
      editable: false,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => (
        <div>
          <a className="mr-2" onClick={() => onEdit(record.storage_id)}>
            Edit
          </a>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.storage_id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEditCell = (storage_id) => {
    console.log("Edit item with ID:", storage_id);
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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Storage Data");
    XLSX.writeFile(workbook, "storage_data.xlsx");
  };

  return (
    <div>
      <Button onClick={exportToExcel}>Export to Exel</Button>
      <div ref={tableWrapperRef}>
        {" "}
        {/* Attach ref to the wrapper div */}
        <LayoutTable
          dataSource={dataSource}
          columns={columns}
          onSave={onSave}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
};

export default StorageTable;
