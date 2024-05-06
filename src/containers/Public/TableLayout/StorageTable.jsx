import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { createAntTag } from "../../../ultils/tagUtils";
import LayoutTable from "./LayoutTable";

const StorageTable = ({ dataSource, onSave, onDelete, onEdit }) => {
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
    },
    {
      title: "Arrival Date",
      dataIndex: "arrival_date",
      editable: false,
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
      title: "User ID",
      dataIndex: "user_id",
      editable: false,
    },
    {
      title: "User ID Deleted",
      dataIndex: "user_id_deleted",
      editable: false,
    },
    {
      title: "Deleted",
      dataIndex: "deleted",
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
    // Xử lý logic khi người dùng click vào nút "Edit" với ID là storage_id
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

export default StorageTable;
