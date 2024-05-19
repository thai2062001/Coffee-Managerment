import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { createAntTag } from "../../../ultils/tagUtils";
import LayoutTable from "./LayoutTable";

const UserTable = ({ dataSource, onDelete, onSave, onEdit }) => {
  const defaultColumns = [
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
      editable: true,
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
        <div>
          <a className="mr-2" onClick={() => onEdit(record.user_id)}>
            Edit
          </a>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.user_id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEditCell = (user_id) => {
    // Xử lý logic khi người dùng click vào nút "Edit" với ID là staff_id

    console.log("Edit item with ID:", user_id);
    onEdit(user_id);
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

export default UserTable;
