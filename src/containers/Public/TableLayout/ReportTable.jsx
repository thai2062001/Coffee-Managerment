import React, { useEffect, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons"; // Import biểu tượng tìm kiếm
import { createAntTag } from "../../../ultils/tagUtils";
import LayoutTable from "./LayoutTable";
import { formatDate } from "../../../components/MomentDate"; // Import hàm formatDate

const ReportTable = ({ dataSource, onDelete, onSave, onEdit }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(dataSource);

  useEffect(() => {
    // Lọc dữ liệu dựa trên giá trị tìm kiếm
    const filtered = dataSource.filter((item) =>
      formatDate(item.created_at).includes(searchText)
    );
    setFilteredData(filtered);
  }, [searchText, dataSource]);

  const defaultColumns = [
    {
      title: "Report ID",
      dataIndex: "report_id",
      editable: false,
    },
    {
      title: "Username",
      dataIndex: "username",
      editable: true,
    },
    {
      title: "Content",
      dataIndex: "content",
      editable: true,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      editable: true,
      render: (text) => formatDate(text), // Sử dụng hàm formatDate để định dạng giá trị
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

export default ReportTable;
