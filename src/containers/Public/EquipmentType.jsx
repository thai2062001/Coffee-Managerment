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
import {
  fetchEquipmentData,
  deleteEquipmentData,
  addEquipmentData,
} from "./../../store/Slice/equipmentTypeSlice";
import EquipmentTypeTable from "./TableLayout/EquipmentTypeTable";
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
const EquipmentType = () => {
  const [selectedKeys, setSelectedKeys] = useState(["14"]);
  const dispatch = useDispatch();
  const equipTypeList = useSelector((state) => state.type.equipType);
  const [dataSource, setDataSource] = useState(equipTypeList);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    dispatch(fetchEquipmentData());
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
      15: path.DAILYREPORT,
      16: path.TIMEKEEPING,
    };

    const pathLink = keyMap[selectedKeys[0]];
    if (pathLink) navigate(pathLink);
  }, [selectedKeys, navigate]);

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
              <span className="text-[28px] font-bold ">Equipment Type </span>
            </div>
            <div className="w-1800 flex flex-col justify-start  mt-3">
              <div className="w-200"></div>
            </div>
            {/* <AddUserForm onAddData={handleAdd} /> */}
            <EquipmentTypeTable dataSource={dataSource} />
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

export default EquipmentType;
