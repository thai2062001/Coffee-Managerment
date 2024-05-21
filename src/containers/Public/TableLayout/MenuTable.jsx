import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { createAntTag } from "../../../ultils/tagUtils";
import LayoutTable from "./LayoutTable";

const MenuTable = ({ dataSource, onDelete, onSave, onEdit }) => {
  const defaultColumns = [
    {
      title: "ID",
      dataIndex: "menu_id",
      editable: false,
    },
    {
      title: "Menu Name",
      dataIndex: "menu_name",
      editable: true,
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
            onClick={() => onEdit(record.menu_id)}
            style={{ backgroundColor: "#4CAF50", color: "white" }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.menu_id)}
          >
            <Button style={{ backgroundColor: "#f44336", color: "white" }}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEditCell = (menu_id) => {
    // Xử lý logic khi người dùng click vào nút "Edit" với ID là drink_id

    console.log("Edit item with ID:", menu_id);
    onEdit(menu_id);
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

export default MenuTable;
