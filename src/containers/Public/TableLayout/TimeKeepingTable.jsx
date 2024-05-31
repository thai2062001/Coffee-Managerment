import React, { useEffect, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons"; // Import biểu tượng tìm kiếm
import { createAntTag } from "../../../ultils/tagUtils";
import LayoutTable from "./LayoutTable";
import { formatDate } from "../../../components/MomentDate"; // Import hàm formatDate

const TimeKeepingTable = ({ dataSource, onDelete, onSave, onEdit }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(dataSource);

  useEffect(() => {
    // Lọc dữ liệu dựa trên giá trị tìm kiếm
    const filtered = dataSource.filter((item) =>
      formatDate(item.date).includes(searchText)
    );
    setFilteredData(filtered);
  }, [searchText, dataSource]);
  const defaultColumns = [
    {
      title: "Attendance_id",
      dataIndex: "attendance_id",
      editable: false,
    },
    {
      title: "Username",
      dataIndex: "username",
      editable: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      editable: true,
      render: (text) => formatDate(text),
    },
    {
      title: "Check In",
      dataIndex: "check_in_time",
      editable: true,
      render: (text) => formatDate(text),
    },
    {
      title: "Check Out",
      dataIndex: "check_out_time",
      editable: true,
      render: (text) => formatDate(text),
    },
    {
      title: "Status",
      dataIndex: "status",
      editable: true,
    },
    {
      title: " Notes",
      dataIndex: "notes",
      editable: true,
    },
  ];

  const handleEditCell = (role_id) => {
    // Xử lý logic khi người dùng click vào nút "Edit" với ID là staff_id
    console.log("Edit item with ID:", role_id);
    onEdit(role_id);
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
      <Input
        placeholder="Search by Created At"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
        prefix={<SearchOutlined />} // Thêm biểu tượng tìm kiếm vào hộp tìm kiếm
      />
      <LayoutTable
        dataSource={filteredData}
        columns={columns}
        onSave={onSave}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </>
  );
};

export default TimeKeepingTable;
