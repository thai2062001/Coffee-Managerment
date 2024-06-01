import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Button, Col, Drawer, Form, Input, Row, Space, Select } from "antd";
import {
  showFailureNotification,
  showSuccessNotification,
} from "../../../ultils/notificationUtils";
import { fetchRoleData } from "../../../store/Slice/roleSlice";
import { fetchStaffData } from "../../../store/Slice/staffSlice";
import { callAPINoHead, callAPIPost } from "../../../ultils/axiosApi";
import { path } from "../../../ultils/constant";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserExistData } from "../../../store/Slice/UserSlice";
const { Item } = Form;
const { Option } = Select;

const passwordValidator = (rule, value) => {
  if (!value) {
    return Promise.reject("Please enter a password");
  }
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
  if (!regex.test(value)) {
    return Promise.reject(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long."
    );
  }
  return Promise.resolve();
};

const AddUserForm = ({ onAddData }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const roleList = useSelector((state) => state.role.roleList);
  const staffList = useSelector((state) => state.staff.staffList);
  const userExistList = useSelector((state) => state.user.userExistList);

  useEffect(() => {
    dispatch(fetchRoleData());
    dispatch(fetchUserExistData());
    dispatch(fetchStaffData());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone_number: "",
    role_id: "",
    staff_id: "",
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const resetFormData = () => {
    form.resetFields();
  };

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      // Gửi dữ liệu lên server và xử lý kết quả thành công
      onAddData(formData);
      resetFormData();
      onClose();
    } catch (errorInfo) {
      showFailureNotification(
        "error",
        "Please fill out all fields and ensure the password is valid."
      );
    }
  };

  const handleChangeForm = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  // Filter staff list based on userExistList
  const availableStaffList = staffList.filter((staff) =>
    userExistList.some((user) => user.staff_id === staff.staff_id)
  );

  return (
    <>
      <Button
        className="bg-[#5BBCFF] mb-5"
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        New User
      </Button>
      <Drawer
        title="Create a new User"
        width={720}
        onClose={onClose}
        visible={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button className="bg-[#5BBCFF]" onClick={handleAdd} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          onFinish={resetFormData}
          form={form}
          layout="vertical"
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Item
                name="username"
                label="New Username"
                rules={[
                  { required: true, message: "Please enter new username" },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter new User"
                  onChange={(e) => handleChangeForm("username", e.target.value)}
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter a password" },
                  { validator: passwordValidator },
                ]}
              >
                <Input.Password
                  style={{ width: "100%" }}
                  placeholder="Enter a password"
                  onChange={(e) => handleChangeForm("password", e.target.value)}
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="phone_number"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter a phone number" },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Enter a phone number"
                  onChange={(e) =>
                    handleChangeForm("phone_number", e.target.value)
                  }
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="role_id"
                label="Role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select a role"
                  onChange={(value) => handleChangeForm("role_id", value)}
                >
                  {roleList.map((role) => (
                    <Option key={role.role_id} value={role.role_id}>
                      {role.role_name}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="staff_id"
                label="Staff"
                rules={[{ required: true, message: "Please select a staff" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select a staff"
                  onChange={(value) => handleChangeForm("staff_id", value)}
                >
                  {availableStaffList.map((staff) => (
                    <Option key={staff.staff_id} value={staff.staff_id}>
                      {staff.staff_name}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddUserForm;
