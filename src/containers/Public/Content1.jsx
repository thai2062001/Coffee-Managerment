import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { path } from "../../ultils/constant";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import HeaderLayout from "./HeaderLayout";
import StorageTable from "./TableLayout/StorageTable";
import AddForm from "./FormLayout/AddForm";
import {
  showSuccessNotification,
  showFailureNotification,
} from "../../ultils/notificationUtils";
import EditForm from "./FormLayout/EditForm";
import Drink from "./Drink";
import { callAPINoHead } from "../../ultils/axiosApi";
const { Header, Content, Footer, Sider } = Layout;
const items2 = [
  {
    key: "sub1",
    icon: React.createElement(UserOutlined),
    label: "Manage Storage and tools",
    children: [
      { key: "1", label: "Storage" },
      { key: "2", label: "tools" },
    ],
  },
  {
    key: "sub2",
    icon: React.createElement(LaptopOutlined),
    label: "Manage drinks and menus ",
    children: [
      { key: "5", label: "Drink" },
      { key: "6", label: "Menu" },
    ],
  },
  {
    key: "sub3",
    icon: React.createElement(NotificationOutlined),
    label: "Manage permissions and employees",
    children: [
      { key: "9", label: "Employees" },
      { key: "10", label: "Permission" },
    ],
  },
  {
    key: "sub4",
    icon: React.createElement(NotificationOutlined),
    label: "Bill management",
    children: [
      { key: "11", label: "Bill" },
      { key: "12", label: "Statistical" },
    ],
  },
];
const Content1 = () => {
  const [selectedKeys, setSelectedKeys] = useState(["1"]);
  const navigate = useNavigate();
  const [count, setCount] = useState(2);
  const [newData, setNewData] = useState({});
  const [editingData, setEditingData] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [dataBase, setDatabase] = useState();
  const [dataSource, setDataSource] = useState([
    {
      storage_id: "1",
      goods_name: "Arabica coffee beans",
      arrival_date: "2024-01-01 00:00:00",
      cost_price: "30000.0",
      quantity: "0.0",
      goods_unit: "kilogram",
      user_id: "1",
      user_id_deleted: null,
      deleted: "0",
      equipmenttype_id: "1",
    },
    {
      storage_id: "2",
      goods_name: "Robusta coffee beans",
      arrival_date: "2024-01-01 00:00:00",
      cost_price: "1500000.0",
      quantity: "10.0",
      goods_unit: "kilogram",
      user_id: "1",
      user_id_deleted: null,
      deleted: "0",
      equipmenttype_id: "1",
    },
    {
      storage_id: "3",
      goods_name: "Liberica coffee beans",
      arrival_date: "2024-01-01 00:00:00",
      cost_price: "1500000.0",
      quantity: "0.0",
      goods_unit: "kilogram",
      user_id: "1",
      user_id_deleted: null,
      deleted: "0",
      equipmenttype_id: "1",
    },
    {
      storage_id: "4",
      goods_name: "Liberica coffee beans",
      arrival_date: "2024-01-01 00:00:00",
      cost_price: "1500000.0",
      quantity: "0.0",
      goods_unit: "kilogram",
      user_id: "1",
      user_id_deleted: null,
      deleted: "0",
      equipmenttype_id: "1",
    },
    {
      storage_id: "5",
      goods_name: "Liberica coffee beans",
      arrival_date: "2024-01-01 00:00:00",
      cost_price: "1500000.0",
      quantity: "0.0",
      goods_unit: "kilogram",
      user_id: "1",
      user_id_deleted: null,
      deleted: "0",
      equipmenttype_id: "1",
    },
    {
      storage_id: "6",
      goods_name: "Liberica coffee beans",
      arrival_date: "2024-01-01 00:00:00",
      cost_price: "1500000.0",
      quantity: "0.0",
      goods_unit: "kilogram",
      user_id: "1",
      user_id_deleted: null,
      deleted: "0",
      equipmenttype_id: "1",
    },
    {
      storage_id: "7",
      goods_name: "Liberica coffee beans",
      arrival_date: "2024-01-01 00:00:00",
      cost_price: "1500000.0",
      quantity: "0.0",
      goods_unit: "kilogram",
      user_id: "1",
      user_id_deleted: null,
      deleted: "0",
      equipmenttype_id: "1",
    },
    {
      storage_id: "8",
      goods_name: "Liberica coffee beans",
      arrival_date: "2024-01-01 00:00:00",
      cost_price: "1500000.0",
      quantity: "0.0",
      goods_unit: "kilogram",
      user_id: "1",
      user_id_deleted: null,
      deleted: "0",
      equipmenttype_id: "1",
    },
    {
      storage_id: "9",
      goods_name: "Liberica coffee beans",
      arrival_date: "2024-01-01 00:00:00",
      cost_price: "1500000.0",
      quantity: "0.0",
      goods_unit: "kilogram",
      user_id: "1",
      user_id_deleted: null,
      deleted: "0",
      equipmenttype_id: "1",
    },
    {
      storage_id: "10",
      goods_name: "Liberica coffee beans",
      arrival_date: "2024-01-01 00:00:00",
      cost_price: "1500000.0",
      quantity: "0.0",
      goods_unit: "kilogram",
      user_id: "1",
      user_id_deleted: null,
      deleted: "0",
      equipmenttype_id: "1",
    },
    {
      storage_id: "11",
      goods_name: "Liberica coffee beans",
      arrival_date: "2024-01-01 00:00:00",
      cost_price: "1500000.0",
      quantity: "0.0",
      goods_unit: "kilogram",
      user_id: "1",
      user_id_deleted: null,
      deleted: "0",
      equipmenttype_id: "1",
    },
  ]);
  // const handleAdd = () => {
  //   const newData = {
  //     storage_id: count,
  //     goods_name: `Liberica coffee beans ${count}`,
  //     arrival_date: "2024-01-01 00:00:00",
  //     cost_price: "1500000.0",
  //     quantity: "0.0",
  //     goods_unit: "kilogram",
  //     user_id: "1",
  //     user_id_deleted: null,
  //     deleted: "0",
  //     equipmenttype_id: "1",
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await callAPINoHead(
  //         "http://localhost:3000/drinks ",
  //         "GET"
  //       );
  //       console.log("Data from API:", data);
  //       setDatabase(data);
  //     } catch (error) {
  //       console.error("Failed to fetch data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const handleAdd = (data) => {
    // Kiểm tra xem formData có dữ liệu không
    if (
      Object.values(data).some(
        (value) => value !== "" && value !== null && value !== undefined
      )
    ) {
      setNewData(data);
      console.log(newData);
      setDataSource([...dataSource, data]);
    } else {
      console.log("Vui lòng điền đầy đủ thông tin trước khi thêm.");
    }
  };

  const handleEdit = (storage_id) => {
    setSelectedItemId(storage_id);
    const editingItem = dataSource.find(
      (item) => item.storage_id === storage_id
    );
    console.log("Đã tìm thấy data", editingItem);
    setEditingData(editingItem);
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.storage_id !== key);
    console.log(newData);
    setDataSource(newData);
    showSuccessNotification("Thông báo", "Đã xóa thành công");
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.storage_id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    const key = e.key;
    setSelectedKeys([key]);
  };
  useEffect(() => {
    if (selectedKeys[0] === "1") {
      console.log("Rendering Content1, selectedKeys:", selectedKeys);
      return;
    } else if (selectedKeys[0] === "2") {
      console.log("Rendering Content1, selectedKeys:", selectedKeys);
      navigate(path.CONTENT2);
    } else if (selectedKeys[0] === "5") {
      console.log("Rendering Drink, selectedKeys:", selectedKeys);
      navigate(path.DRINK);
    }
  }, [selectedKeys, navigate]);
  return (
    <Layout>
      <HeaderLayout />
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              onClick={handleMenuClick}
              mode="inline"
              selectedKeys={selectedKeys}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <div className="flex justify-center p-1 ">
              <span className="text-[28px] font-bold ">Quản lý kho</span>
            </div>
            <div className="w-1800 flex flex-col justify-start  mt-3">
              <div className="w-200">
                <AddForm onAddData={handleAdd} />
              </div>
              <StorageTable
                dataSource={dataSource}
                onAdd={handleAdd}
                onDelete={handleDelete}
                onSave={handleSave}
                onEdit={handleEdit}
              />
              {editingData && <EditForm data={editingData} />}
            </div>
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer>
    </Layout>
  );
};
export default Content1;
