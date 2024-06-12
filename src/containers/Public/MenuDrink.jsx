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
import { useDispatch, useSelector } from "react-redux";
import EditRecipe from "./FormLayout/EditRecipe";
import { fetchMenuData } from "../../store/Slice/MenuSlice";
import EditMenu from "./FormLayout/EditMenu";
import MenuTable from "./TableLayout/MenuTable";
import {
  showSuccessNotification,
  showFailureNotification,
} from "../../ultils/notificationUtils";
import { callAPINoHead, callAPIDelete } from "../../ultils/axiosApi";
import AddMenu from "./FormLayout/AddMenu";
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
const MenuDrink = () => {
  const [selectedKeys, setSelectedKeys] = useState(["7"]);
  const [dataSource, setDataSource] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [edittingMenuId, setEditingRecipeId] = useState(null);
  const dispatch = useDispatch();
  const menuList = useSelector((state) => state.menu.menuList);

  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);
  useEffect(() => {
    setDataSource(menuList);
  }, [menuList]);
  console.log(menuList);
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
  const handleAdd = (data) => {
    // Kiểm tra xem formData có dữ liệu không
    if (
      Object.values(data).some(
        (value) => value !== "" && value !== null && value !== undefined
      )
    ) {
      setDataSource([...dataSource, data]);
    } else {
      console.log("Vui lòng điền đầy đủ thông tin trước khi thêm.");
    }
  };
  const handleEdit = (menu_id) => {
    console.log(menu_id);
    setEditingRecipeId(menu_id);
    setIsEditing(true);
  };

  const handleDelete = async (itemId) => {
    console.log(itemId);
    try {
      await callAPIDelete(`http://localhost:5000/menu/${itemId}`);
      console.log("Menu Item deleted successfully!");
      const newData = dataSource.filter((item) => item.menu_id !== itemId);
      setDataSource(newData);
      showSuccessNotification("Success", " Item deleted successfully!");
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  // const handleDelete = (key) => {
  //   const newData = dataSource.filter((item) => item.drink_id !== key);
  //   console.log(newData);

  //   setDataSource(newData);
  //   showSuccessNotification("Thông báo", "Đã xóa thành công");
  // };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.menu_id);
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
              <span className="text-[28px] font-bold ">Menu Table</span>
            </div>
            <div className="w-1800 flex flex-col justify-start  mt-3">
              <div className="w-200">
                <AddMenu onAddData={handleAdd} />
              </div>
            </div>
            <MenuTable
              dataSource={dataSource}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onSave={handleSave}
              onEdit={handleEdit}
            />
            {isEditing && (
              <EditMenu
                menu_id={edittingMenuId}
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
export default MenuDrink;
