import React, { useState } from "react";
import { Button, Input, Popconfirm, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import LayoutTable from "./LayoutTable";

const DrinkTable = ({ dataSource, onSave, onDelete, onEdit }) => {
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
      title: "Name",
      dataIndex: "drink_name",
      width: "20%",
      editable: true,
      ...getColumnSearchProps("drink_name"),
      sorter: (a, b) => a.drink_name.localeCompare(b.drink_name),
    },
    {
      title: "Price",
      dataIndex: "price",
      editable: true,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Image",
      dataIndex: "image_url",
      render: (text) => (
        <img src={text} alt="image_url" style={{ width: 150, height: 150 }} />
      ), // Hiển thị ảnh
      editable: false,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => (
        <div>
          <a className="mr-2" onClick={() => onEdit(record.drink_id)}>
            Edit
          </a>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.drink_id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEditCell = (drink_id) => {
    console.log("Edit item with ID:", drink_id);
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

export default DrinkTable;
