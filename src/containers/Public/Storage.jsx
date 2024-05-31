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
import { useDispatch, useSelector } from "react-redux";
import AddForm from "./FormLayout/AddForm";
import {
  showSuccessNotification,
  showFailureNotification,
} from "../../ultils/notificationUtils";
import {
  fetchStorageData,
  deleteStorageData,
  addStorageData,
} from "./../../store/Slice/storageSlice";
import EditStorage from "./FormLayout/EditStorage";
const { Header, Content, Footer, Sider } = Layout;
const items2 = [
  {
    key: "sub1",
    icon: React.createElement(UserOutlined),
    label: "Manage Storage and tools",
    children: [
      { key: "1", label: "Storage" },
      { key: "2", label: "Coffee Brewing Tools" },
      { key: "3", label: "Ingredients" },
      { key: "4", label: "Shop Equipments" },
      { key: "14", label: "Statistical" },
    ],
  },
  {
    key: "sub2",
    icon: React.createElement(LaptopOutlined),
    label: "Manage drinks and menus ",
    children: [
      { key: "5", label: "Drink" },
      { key: "6", label: "Recipe" },
      { key: "7", label: "Menu" },
    ],
  },
  {
    key: "sub3",
    icon: React.createElement(NotificationOutlined),
    label: "Manage permissions and employees",
    children: [
      { key: "9", label: "Employees" },
      { key: "15", label: "Daily Report" },
      { key: "16", label: "Timekeeping" },
      { key: "10", label: "Permission" },
      { key: "13", label: "User & Account" },
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
const Storage = () => {
  const [selectedKeys, setSelectedKeys] = useState(["1"]);
  const navigate = useNavigate();
  const [editingData, setEditingData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const storageList = useSelector((state) => state.storage.storageList);
  const [dataSource, setDataSource] = useState(storageList);

  useEffect(() => {
    dispatch(fetchStorageData());
  }, [dispatch]);
  useEffect(() => {
    setDataSource(storageList);
  }, [storageList]);

  const handleAdd = async (data) => {
    console.log("formData:", data);
    if (
      data.goods_name &&
      data.cost_price &&
      data.goods_unit &&
      data.equipmenttype_id
    ) {
      try {
        await dispatch(addStorageData(data));
        // Lưu thông báo thành công vào localStorage
      } catch (error) {
        console.error("Failed to add new data:", error);
        showSuccessNotification("Success", " Addition Completed Successfully!");
      }
    } else {
      showFailureNotification(
        "Error",
        "Please provide all necessary information before adding"
      );
    }
  };
  const handleEdit = (storage_id) => {
    setEditingData(storage_id);
    setIsEditing(true);
  };

  const handleDelete = async (key) => {
    const newData = dataSource.filter((item) => item.storage_id !== key);
    await dispatch(deleteStorageData(key));
    setDataSource(newData);
    showSuccessNotification("Sucess", "Delected sucessfully");
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
    const keyMap = {
      1: path.STORAGE,
      2: path.COFFEETOOLS,
      3: path.INGREDIENT,
      4: path.SHOPEQUIPMENT,
      5: path.DRINK,
      6: path.RECIPE,
      7: path.MENU,
      9: path.STAFF,
      10: path.ROLE,
      11: path.BILL,
      12: path.STATICTICAL,
      13: path.USER,
      14: path.STATICTICAL_STORAGE,
      15: path.DAILYREPORT,
      16: path.TIMEKEEPING,
    };

    const pathLink = keyMap[selectedKeys[0]];
    if (pathLink) navigate(pathLink);
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
            width={300}
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
              <span className="text-[28px] font-bold ">Storage Table</span>
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
              {isEditing && (
                <EditStorage
                  storage_id={editingData}
                  onEditData={setIsEditing} // Pass the edit handler function to the EditRole component
                />
              )}
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
export default Storage;
