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
import {
  showSuccessNotification,
  showFailureNotification,
} from "../../ultils/notificationUtils";
import EditUser from "./FormLayout/EditUser";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "./../../store/Slice/UserSlice";
import AddUserForm from "./FormLayout/AddUserForm";
import UserTable from "./TableLayout/UserTable";
import { addUserData, deleteUserData } from "./../../store/Slice/UserSlice";
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

const User = () => {
  const [selectedKeys, setSelectedKeys] = useState(["13"]);
  const [isEditing, setIsEditing] = useState(false);
  const [edittingUserId, setEdittingUserId] = useState(null);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList);
  const [dataSource, setDataSource] = useState(userList);
  const [newData, setNewData] = useState({});

  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

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
    };
    const pathLink = keyMap[selectedKeys[0]];
    if (pathLink) navigate(pathLink);
  }, [selectedKeys, navigate]);

  const handleMenuClick = (e) => {
    const key = e.key;
    setSelectedKeys([key]);
  };

  const handleAdd = async (data) => {
    console.log("formData:", data);
    if (
      data.username.trim() !== "" &&
      data.password.trim() !== "" &&
      data.phone_number.trim() !== "" &&
      data.role_id !== "" &&
      data.staff_id !== ""
    ) {
      try {
        await dispatch(addUserData(data));
        console.log("New data added:", data);
        showSuccessNotification("Success", "Addition Completed Successfully");
        setTimeout(() => {
          console.log("Reloading page...");
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Failed to add new data:", error);
        showFailureNotification(
          "Error",
          "Failed to add new data. Please try again later."
        );
      }
    } else {
      showFailureNotification(
        "Error",
        "Please provide all necessary information before adding"
      );
    }
  };

  useEffect(() => {
    setDataSource(userList);
  }, [userList]);

  const handleEdit = (user_id) => {
    console.log("user_id", user_id);
    setEdittingUserId(user_id);
    setIsEditing(true);
  };

  const handleDelete = async (itemId) => {
    console.log(itemId);
    try {
      await dispatch(deleteUserData(itemId));
      const newData = dataSource.filter((item) => item.user_id !== itemId);
      setDataSource(newData);
      showSuccessNotification("Success", "User Item deleted successfully!");
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.role.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

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
              <span className="text-[28px] font-bold ">User & Account</span>
            </div>
            <div className="w-1800 flex flex-col justify-start  mt-3">
              <div className="w-200"></div>
            </div>
            <AddUserForm onAddData={handleAdd} />
            <UserTable
              dataSource={dataSource}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onSave={handleSave}
              onEdit={handleEdit}
            />
            {isEditing && (
              <EditUser
                user_id={edittingUserId}
                onEditData={setIsEditing} // Pass the edit handler function to the EditRole component
              />
            )}
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

export default User;
