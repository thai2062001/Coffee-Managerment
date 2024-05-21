import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Drawer } from "antd";
import HeaderLayout from "./HeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../ultils/constant";
import BillTable from "./TableLayout/BillTable";
import { fetchBillData } from "./../../store/Slice/BillSlice";
import { formatDate } from "../../components/MomentDate";
import AddBillForm from "./FormLayout/AddBillForm";
import { addBillData } from "./../../store/Slice/BillSlice";

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

const Bill = () => {
  const [selectedKeys, setSelectedKeys] = useState(["11"]);
  const dispatch = useDispatch();
  const billList = useSelector((state) => state.bill.billList);
  const [dataSource, setDataSource] = useState(billList);
  console.log(billList);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState(null);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    dispatch(fetchBillData());
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

  const handleViewProfile = (item) => {
    setDrawerData(item); // Set data for the drawer
    setDrawerVisible(true); // Open the drawer
  };

  const handleAdd = async (data) => {
    console.log("formData:", data);
    try {
      await dispatch(addBillData(data));
      console.log("New data added:", data);
      // Reload trang sau 2 giây
    } catch (error) {
      console.error("Failed to add new data:", error);
      showFailureNotification(
        "Error",
        "Failed to add new data. Please try again later."
      );
    }
  };

  useEffect(() => {
    setDataSource(billList);
  }, [billList]);
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
              mode="inline"
              selectedKeys={selectedKeys}
              defaultOpenKeys={["sub1"]}
              onClick={(e) => setSelectedKeys([e.key])}
            >
              {items2.map((item) => (
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                >
                  {item.children.map((child) => (
                    <Menu.Item key={child.key}>{child.label}</Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))}
            </Menu>
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <div className="flex justify-center p-1 ">
              <span className="text-[28px] font-bold ">Bill</span>
            </div>
            <AddBillForm onAddData={handleAdd} />
            <BillTable
              dataSource={dataSource}
              onAdd={handleAdd}
              onViewProfile={handleViewProfile}
            />
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer>
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        {drawerData && (
          <div className="site-description-item-profile-wrapper p-4 bg-white shadow-lg rounded-lg">
            <div className="mb-4">
              <p className="font-bold text-lg">Bill ID: {drawerData.bill_id}</p>
              <p className="text-gray-600">
                Bill Date: {formatDate(drawerData.bill_date)}
              </p>
            </div>
            {drawerData.billdetails &&
              drawerData.billdetails.map((detail, index) => (
                <div key={index} className="mb-3 p-2 border-b last:border-b-0">
                  <p className="font-bold">Drink {index + 1}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <p className="text-gray-600">
                      {detail.drink.drink_name || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      Price:{" "}
                      {detail.drink.price
                        ? `${detail.drink.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}`
                        : "N/A"}
                    </p>
                    {/* {item.totalCostPrice.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })} */}
                    <p className="text-gray-600">
                      Quantity: {detail.quantity || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      Total:{" "}
                      {detail.quantity * detail.drink.price
                        ? `${(
                            detail.quantity * detail.drink.price
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })} `
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            <div className="mt-4 font-bold text-lg">
              <p>
                Total Price:{" "}
                {drawerData.total_price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
        )}
      </Drawer>
    </Layout>
  );
};

export default Bill;
