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
import { useDispatch, useSelector } from "react-redux";
import IngredientTable from "./TableLayout/IngredientTable";
import { fetchIngredientData } from "./../../store/Slice/ingredientSlice";
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
const Ingredient = () => {
  const [selectedKeys, setSelectedKeys] = useState(["3"]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const dispatch = useDispatch();
  const ingredientList = useSelector(
    (state) => state.ingredient.ingredientList
  );
  const [dataSource, setDataSource] = useState(ingredientList);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    dispatch(fetchIngredientData());
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
    if (data.role_name.trim() !== "") {
      try {
        await dispatch(addRoleData(data));
        console.log("New data added:", data);
        // Lưu thông báo thành công vào localStorage
        localStorage.setItem(
          "successMessage",
          JSON.stringify({
            title: "Success",
            message: "Addition Completed Successfully",
          })
        );
        // Reload trang sau 2 giây
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
    } else {
      showFailureNotification(
        "Error",
        "Please provide all necessary information before adding"
      );
    }
  };

  useEffect(() => {
    setDataSource(ingredientList);
  }, [ingredientList]);

  const handleEdit = (ingredient_id) => {
    console.log("ingredient id", ingredient_id);
    setEditingRoleId(ingredient_id);
    setIsEditing(true);
  };

  const handleDelete = async (itemId) => {};

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.ingredient_id);
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
              <span className="text-[28px] font-bold ">Ingredient Table</span>
            </div>
            <div className="w-1800 flex flex-col justify-start  mt-3">
              <div className="w-200"></div>
            </div>
            <IngredientTable
              dataSource={dataSource}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onSave={handleSave}
              onEdit={handleEdit}
            />
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

export default Ingredient;
