import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { path } from "../../ultils/constant";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import HeaderLayout from "./HeaderLayout";
const { Header, Content, Footer, Sider } = Layout;
const items1 = [
  { key: "1", label: "Dashboard" },
  { key: "2", label: "Reports" },
  { key: "3", label: "Settings" },
];
const items2 = [
  {
    key: "sub1",
    icon: React.createElement(UserOutlined),
    label: "Quản lý nhân viên",
    children: [
      { key: "1", label: "Thêm nhân viên" },
      { key: "2", label: "Xem danh sách" },
      { key: "3", label: "Cập nhật thông tin" },
      { key: "4", label: "Xóa nhân viên" },
    ],
  },
  {
    key: "sub2",
    icon: React.createElement(LaptopOutlined),
    label: "Quản lý kho",
    children: [
      { key: "5", label: "Kiểm tra hàng tồn" },
      { key: "6", label: "Thêm hàng mới" },
      { key: "7", label: "Cập nhật hàng tồn" },
      { key: "8", label: "Xóa hàng tồn" },
    ],
  },
  {
    key: "sub3",
    icon: React.createElement(NotificationOutlined),
    label: "Thông báo",
    children: [
      { key: "9", label: "Thông báo nội bộ" },
      { key: "10", label: "Cảnh báo hệ thống" },
      { key: "11", label: "Thông báo khẩn cấp" },
      { key: "12", label: "Xem tất cả thông báo" },
    ],
  },
];
const HeaderAnt = () => {
  const [selectedKeys, setSelectedKeys] = useState(["1"]);

  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    const key = e.key;
    setSelectedKeys([key]);
  };
  useEffect(() => {
    if (selectedKeys[0] === "2") {
      navigate(path.CONTENT2);
    } else if (selectedKeys[0] === "1") {
      console.log("content 1");
      navigate(path.CONTENT1);
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
            <div className="w-1100 flex flex-col justify-start items-center mt-3">
              <Outlet />
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
export default HeaderAnt;
