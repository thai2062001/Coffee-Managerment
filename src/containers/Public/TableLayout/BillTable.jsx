import React from "react";
import { Popconfirm, Button } from "antd";
import LayoutTable from "./LayoutTable";
import { formatDate } from "../../../components/MomentDate";
const BillTable = ({ dataSource, onDelete, onSave, onEdit, onViewProfile }) => {
  const defaultColumns = [
    {
      title: "ID",
      dataIndex: "bill_id",
      editable: false,
    },
    {
      title: "Bill Date",
      dataIndex: "bill_date",
      editable: true,
      render: (text) => {
        // Sử dụng formatDate và hiển thị "N/A" nếu không có ngày
        return text ? formatDate(text) : "N/A";
      },
    },
    {
      title: "Total Price (VND)",
      dataIndex: "total_price",
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
            onClick={() => onViewProfile(record)}
            style={{ backgroundColor: "#4CAF50", color: "white" }}
          >
            Bill Detail
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.bill_id)}
          >
            <Button style={{ backgroundColor: "#f44336", color: "white" }}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEditCell = (bill_id) => {
    console.log("Edit item with ID:", bill_id);
    onEdit(bill_id);
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
        onViewProfile, // Truyền hàm onViewProfile xuống cho cell
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

export default BillTable;
