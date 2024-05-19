import React, { useState, useEffect } from "react";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../store/Slice/UserSlice";
import { path } from "../../../ultils/constant";
import { callAPINoHead } from "../../../ultils/axiosApi";
import {
  showFailureNotification,
  showSuccessNotification,
} from "../../../ultils/notificationUtils";

const EditUser = ({ onEditData, user_id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const getUserById = (state, userId) => {
    const user = state.user.userList.find((user) => user.user_id === userId);
    return user ? user : null;
  };

  const userList = useSelector((state) => getUserById(state, user_id));

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone_number: "",
  });

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (userList) {
      setFormData({
        username: userList.username,
        password: userList.password,
        phone_number: userList.phone_number,
      });

      form.setFieldsValue({
        username: userList.username,
        password: userList.password,
        phone_number: userList.phone_number,
      });
    }
  }, [userList, form]);

  const onClose = () => {
    onEditData(null);
  };

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const apiUrl = `${path.API_BASE_URL}${path.USER_API_URL}/${user_id}`;
      await callAPINoHead(apiUrl, "PATCH", formData);
      dispatch(fetchUserData());
      showSuccessNotification("Success", "Update Completed Successfully");
      onClose();
    } catch (error) {
      showFailureNotification("Error", "Failed to update user");
      console.error("Failed to edit user:", error);
    }
  };

  const resetFormData = () => {
    setFormData({
      username: "",
      password: "",
      phone_number: "",
    });
    form.resetFields();
  };

  return (
    <>
      <Drawer
        title="Edit User"
        width={720}
        onClose={onClose}
        visible={user_id !== null}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              className="bg-[#5BBCFF]"
              onClick={handleSubmit}
              type="primary"
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please enter username" }]}
              >
                <Input
                  placeholder="Please enter username"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter password" }]}
              >
                <Input.Password
                  placeholder="Please enter password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input
                  placeholder="Please enter phone number"
                  value={formData.phone_number}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EditUser;
