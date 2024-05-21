import React, { useState } from "react";
import { Button, Input, Popconfirm, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import LayoutTable from "./LayoutTable";

const RecipeTable = ({ dataSource, onDelete, onSave, onEdit }) => {
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

  const defaultColumns = [
    {
      title: "ID",
      dataIndex: "drink_id",
      editable: false,
      sorter: (a, b) => a.drink_id - b.drink_id,
    },
    {
      title: "Drink Name",
      dataIndex: "drink_name",
      editable: true,
      ...getColumnSearchProps("drink_name"),
      sorter: (a, b) => a.drink_name.localeCompare(b.drink_name),
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
            onClick={() => onEdit(record.drink_id)}
            style={{ backgroundColor: "#4CAF50", color: "white" }}
          >
            Recipe
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.drink_id)}
          >
            <Button style={{ backgroundColor: "#f44336", color: "white" }}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEditCell = (drink_id) => {
    console.log("Edit item with ID:", drink_id);
    onEdit(drink_id);
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
    <LayoutTable
      dataSource={dataSource}
      columns={columns}
      onSave={onSave}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );
};

export default RecipeTable;
