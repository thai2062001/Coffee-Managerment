import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { path } from "../../ultils/constant";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  DatePicker,
  Button,
  Form,
  Card,
  Typography,
  List,
} from "antd";
import HeaderLayout from "./HeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoleData } from "./../../store/Slice/roleSlice";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

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

const Statictical = () => {
  const [selectedKeys, setSelectedKeys] = useState(["12"]);
  const dispatch = useDispatch();
  const roleList = useSelector((state) => state.role.roleList);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [dates, setDates] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    dispatch(fetchRoleData());
  }, [dispatch]);

  useEffect(() => {
    const keyMap = {
      1: path.STORAGE,
      2: path.COFFEETOOLS,
      3: path.INGREDIENT,
      4: path.SHOPEQUIPMENT,
      5: path.DRINK,
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

  const handleSubmit = async () => {
    if (dates.length === 2) {
      const [fromDate, toDate] = dates;

      try {
        const response = await axios.post(
          "http://localhost:5000/bill/statictical",
          {
            fromDateInput: fromDate.format("YYYY/MM/DD"),
            toDateInput: toDate.format("YYYY/MM/DD"),
          }
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <Layout>
      <HeaderLayout />
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
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
          <Sider style={{ background: colorBgContainer }} width={300}>
            <Menu
              onClick={handleMenuClick}
              mode="inline"
              selectedKeys={selectedKeys}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <div className="flex justify-center p-1">
              <span className="text-[28px] font-bold">Statistical Bill</span>
            </div>
            <div className="w-full flex flex-col justify-start mt-3">
              <Card className="shadow-md rounded p-4">
                <Title level={2} className="text-center mb-4">
                  Select Date Range
                </Title>
                <Form layout="vertical" onFinish={handleSubmit}>
                  <Form.Item label="Select Date Range:" required>
                    <RangePicker
                      onChange={(values) => setDates(values)}
                      className="w-full"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="bg-[#5BBCFF] mb-5 w-full"
                    >
                      Get Statistical Bill
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
              {data && (
                <Card className="shadow-md rounded mt-4 p-4">
                  <Title level={3} className="mb-4">
                    Results
                  </Title>
                  <Text className="text-lg">
                    Total Price:{" "}
                    {data.totalPriceAll.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>

                  <Title level={4} className="mt-4">
                    Drink Counts:
                  </Title>
                  <List
                    bordered
                    dataSource={Object.entries(data.drinkCounts)}
                    renderItem={([drink, count]) => (
                      <List.Item>
                        {drink}: {count}
                      </List.Item>
                    )}
                  />
                </Card>
              )}
            </div>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
};

export default Statictical;
