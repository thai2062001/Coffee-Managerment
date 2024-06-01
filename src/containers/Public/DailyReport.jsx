import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Input, Button, Form } from "antd";
import HeaderLayout from "./HeaderLayout";
import { useDispatch } from "react-redux";
import { path } from "../../ultils/constant";
import { addReportData } from "../../store/Slice/staffSlice";
import { callAPIHead } from "../../ultils/axiosApi";
import {
  showFailureNotification,
  showSuccessNotification,
} from "../../ultils/notificationUtils";
import moment from "moment";

const { Header, Content, Footer, Sider } = Layout;

const items2 = [
  {
    key: "sub1",
    icon: React.createElement(UserOutlined),
    label: "Manage Storage and tools",
    children: [
      { key: "1", label: "Bill" },
      { key: "2", label: "Order" },
      { key: "3", label: "Daily Report" },
    ],
  },
];

const DailyReport = () => {
  const [selectedKeys, setSelectedKeys] = useState(["3"]);
  const [isCheckedIn, setIsCheckedIn] = useState(
    localStorage.getItem("isCheckedIn") === "true"
  );
  const [form] = Form.useForm(); // Add form instance here
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const keyMap = {
      1: path.STAFF_BILL,
      2: path.STAFF_ORDER,
      3: path.STAFF_REPORT,
    };
    const pathLink = keyMap[selectedKeys[0]];
    if (pathLink) navigate(pathLink);
  }, [selectedKeys, navigate]);

  const handleAdd = async (data) => {
    try {
      await dispatch(addReportData({ content: data.content }));
      showSuccessNotification("Success", "Addition Completed Successfully");
      form.resetFields(); // Reset the form fields after successful submission
    } catch (error) {
      console.error("Failed to add new data:", error);
      showFailureNotification(
        "Error",
        "Failed to add new data. Please try again later."
      );
    }
  };

  const handleCheckIn = async () => {
    const url = path.API_BASE_URL + path.STAFF_API_CHECKIN;
    try {
      const response = await callAPIHead(url, "POST", {});
      if (response === true) {
        setIsCheckedIn(true);
        localStorage.setItem("isCheckedIn", "true");
        showSuccessNotification("Success", "Check-in Completed Successfully");
      } else {
        showFailureNotification("Error", "Already checked in.");
      }
    } catch (error) {
      console.error("Failed to check-in:", error);
      showFailureNotification(
        "Error",
        "Failed to check-in. Please try again later."
      );
    }
  };

  const handleCheckOut = async () => {
    const checkReportUrl = path.API_BASE_URL + path.STAFF_API_GET_CHECK_REPORT;
    try {
      const reportResponse = await callAPIHead(checkReportUrl, "GET");
      if (reportResponse === true) {
        const url = path.API_BASE_URL + path.STAFF_API_CHECKOUT;
        try {
          await callAPIHead(url, "POST", {});
          setIsCheckedIn(false);
          localStorage.setItem("isCheckedIn", "false");
          showSuccessNotification(
            "Success",
            "Check-out Completed Successfully"
          );
        } catch (error) {
          console.error("Failed to check-out:", error);
          showFailureNotification(
            "Error",
            "Failed to check-out. Please try again later."
          );
        }
      } else {
        showFailureNotification(
          "Error",
          "You must create a daily report before checking out."
        );
      }
    } catch (error) {
      console.error("Failed to check report status:", error);
      showFailureNotification(
        "Error",
        "Failed to check report status. Please try again later."
      );
    }
  };

  return (
    <Layout>
      <HeaderLayout />
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            {isCheckedIn ? (
              <Button
                type="primary"
                className="bg-[#8d54c0]"
                onClick={handleCheckOut}
              >
                Check Out
              </Button>
            ) : (
              <Button
                type="primary"
                className="bg-[#8d54c0]"
                onClick={handleCheckIn}
              >
                Check In
              </Button>
            )}
          </div>
        </div>
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
              <span className="text-[28px] font-bold ">Daily Report</span>
            </div>
            <Form
              layout="vertical"
              onFinish={handleAdd}
              initialValues={{ date: moment().format("YYYY-MM-DD HH:mm:ss") }}
              form={form} // Bind form instance to Form component
              className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md"
            >
              <Form.Item label="Date" name="date">
                <Input readOnly />
              </Form.Item>
              <Form.Item
                label="Content"
                name="content"
                rules={[
                  { required: true, message: "Please input the content!" },
                ]}
              >
                <Input.TextArea
                  rows={15}
                  placeholder="Enter your report content"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="bg-[#8d54c0] w-[250px]"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
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

export default DailyReport;
