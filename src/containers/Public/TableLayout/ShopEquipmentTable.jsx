import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { createAntTag } from "../../../ultils/tagUtils";
import LayoutTable from "./LayoutTable";

const ShopEquipmentTable = ({ dataSource, onDelete, onSave, onEdit }) => {
  const defaultColumns = [
    {
      title: "Equipment ID",
      dataIndex: "equipment_id",
      editable: false,
    },
    {
      title: "Name",
      dataIndex: "equipment_name",
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
    //       <a className="mr-2" onClick={() => onEdit(record.brewingTool_id)}>
    //         Edit
    //       </a>
    //       <Popconfirm
    //         title="Sure to delete?"
    //         onConfirm={() => onDelete(record.brewingTool_id)}
    //       >
    //         <a>Delete</a>
    //       </Popconfirm>
    //     </div>
    //   ),
    // },
  ];

  const handleEditCell = (equipment_id) => {
    // Xử lý logic khi người dùng click vào nút "Edit" với ID là staff_id

    console.log("Edit item with ID:", equipment_id);
    onEdit(equipment_id);
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

export default ShopEquipmentTable;
