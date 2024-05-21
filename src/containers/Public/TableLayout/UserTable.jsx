import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Button, Input } from "antd";
import PasswordField from "./../../../components/PasswordField";

const UserTable = ({ dataSource, onDelete, onSave, onEdit }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(dataSource);

  useEffect(() => {
    // Filter data when searchText or dataSource changes
    const filtered = dataSource.filter((item) =>
      Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchText, dataSource]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "user_id",
      editable: false,
    },
    {
      title: "Name",
      dataIndex: "username",
      editable: true,
    },
    {
      title: "Password",
      dataIndex: "password",
      render: (text) => <PasswordField password={text} />,
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      editable: true,
    },
    {
      title: "Role ID",
      dataIndex: "role_id",
      editable: true,
    },
    {
      title: "Staff ID",
      dataIndex: "staff_id",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            onClick={() => onEdit(record.user_id)}
            style={{ backgroundColor: "#4CAF50", color: "white" }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.user_id)}
          >
            <Button style={{ backgroundColor: "#f44336", color: "white" }}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 200, marginLeft: 20 }}
      />
      <Table dataSource={filteredData} columns={columns} rowKey="user_id" />
    </>
  );
};

export default UserTable;
