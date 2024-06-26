import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { createAntTag } from "../../../ultils/tagUtils";
import LayoutTable from "./LayoutTable";

const IngredientTable = ({ dataSource, onDelete, onSave, onEdit }) => {
  const defaultColumns = [
    {
      title: "Ingredient ID",
      dataIndex: "ingredient_id",
      editable: false,
    },
    {
      title: "Name",
      dataIndex: "ingredient_name",
      editable: true,
    },
    {
      title: "Storage ID",
      dataIndex: "storage_id",
      editable: true,
    },
    // {
    //   title: "Operation",
    //   dataIndex: "operation",
    //   render: (_, record) => (
    //     <div>
    //       <a className="mr-2" onClick={() => onEdit(record.role_id)}>
    //         Edit
    //       </a>
    //       <Popconfirm
    //         title="Sure to delete?"
    //         onConfirm={() => onDelete(record.role_id)}
    //       >
    //         <a>Delete</a>
    //       </Popconfirm>
    //     </div>
    //   ),
    // },
  ];

  const handleEditCell = (ingredient_id) => {
    // Xử lý logic khi người dùng click vào nút "Edit" với ID là staff_id

    console.log("Edit item with ID:", ingredient_id);
    onEdit(ingredient_id);
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

export default IngredientTable;
