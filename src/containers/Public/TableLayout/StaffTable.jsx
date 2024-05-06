import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { createAntTag } from "../../../ultils/tagUtils";
import LayoutTable from "./LayoutTable";

const StaffTable = ({ dataSource, onSave, onDelete, onEdit }) => {
  const defaultColumns = [
    {
      title: "ID",
      dataIndex: "staff_id",
      editable: false,
    },
    {
      title: "Name",
      dataIndex: "staff_name",
      editable: false,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      editable: true,
      render: (text) => {
        let color = text === "Male" ? "#f50" : "#108ee9";
        return createAntTag(text, color);
      },
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      editable: false,
    },
    {
      title: "Address",
      dataIndex: "address",
      editable: true,
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: false,
    },
    {
      title: "Position",
      dataIndex: "position",
      editable: false,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      editable: false,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      editable: false,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => (
        <div>
          <a className="mr-2" onClick={() => onEdit(record.staff_id)}>
            Edit
          </a>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.staff_id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEditCell = (staff_id) => {
    // Xử lý logic khi người dùng click vào nút "Edit" với ID là staff_id
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
    <LayoutTable
      dataSource={dataSource}
      columns={columns}
      onSave={onSave}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );
};

export default StaffTable;
