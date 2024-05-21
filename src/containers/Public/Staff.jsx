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
import AddStaffForm from "./FormLayout/AddStaffForm";
import {
  showSuccessNotification,
  showFailureNotification,
} from "../../ultils/notificationUtils";
import EditForm from "./FormLayout/EditForm";
import StaffTable from "./TableLayout/StaffTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffData } from "../../store/Slice/staffSlice";
import {
  callAPINoHead,
  callAPIDelete,
  callApiUpdate,
} from "../../ultils/axiosApi";
import { formatDate } from "../../components/MomentDate";
import axios from "axios";
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
const Staff = () => {
  const [selectedKeys, setSelectedKeys] = useState(["9"]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [dataSource, setDataSource] = useState();
  const dispatch = useDispatch();
  const staffList = useSelector((state) => state.staff.staffList);

  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    dispatch(fetchStaffData());
  }, [dispatch]);

  useEffect(() => {
    setDataSource(staffList);
  }, [staffList]);

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

  const handleAdd = async (data) => {
    // Kiểm tra xem formData có dữ liệu không
    const access_Token = localStorage.getItem("access-token");
    try {
      console.log(data);
      // Gọi API POST để thêm dữ liệu mới
      const response = await axios.post(
        path.API_BASE_URL + path.STAFF_API_URL,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_Token}`,
          },
        }
      );
      const newData = response.data; // Dữ liệu trả về từ API
      console.log("New data added:", newData);
      showSuccessNotification("Success", "Addition Completed Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Failed to add new data:", error);
      showFailureNotification(
        "Error",
        "Failed to add new data. Please try again later."
      );
    }
  };

  const handleEdit = (staff_id) => {
    console.log(staff_id);
    setEditingRoleId(staff_id);
    setIsEditing(true);
  };

  const handleDelete = async (itemId) => {
    console.log(itemId);
    try {
      await callApiUpdate(`http://localhost:5000/staff/remove/${itemId}`);
      console.log("Staff Item deleted successfully!");
      const newData = dataSource.filter((item) => item.staff_id !== itemId);
      setDataSource(newData);
      showSuccessNotification("Success", "Item deleted successfully!");
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.staff.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const handleMenuClick = (e) => {
    const key = e.key;
    setSelectedKeys([key]);
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
              <span className="text-[28px] font-bold ">Staff Table</span>
            </div>
            <div className="w-1800 flex flex-col justify-start  mt-3">
              <div className="w-200">
                <AddStaffForm onAddData={handleAdd} />
              </div>
            </div>
            <StaffTable
              dataSource={dataSource}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onSave={handleSave}
              onEdit={handleEdit}
            />
            {isEditing && (
              <EditForm
                staff_id={editingRoleId}
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
export default Staff;
