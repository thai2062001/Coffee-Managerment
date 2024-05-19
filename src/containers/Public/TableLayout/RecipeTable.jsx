import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { createAntTag } from "../../../ultils/tagUtils";
import LayoutTable from "./LayoutTable";

const RecipeTable = ({ dataSource, onDelete, onSave, onEdit }) => {
  const defaultColumns = [
    {
      title: "ID",
      dataIndex: "drink_id",
      editable: false,
    },
    {
      title: "Drink Name",
      dataIndex: "drink_name",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => (
        <div>
          <a className="mr-2" onClick={() => onEdit(record.drink_id)}>
            Recipe
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
    // Xử lý logic khi người dùng click vào nút "Edit" với ID là drink_id

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
