import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Upload,
  Row,
  Space,
  Select,
  DatePicker,
} from "antd";
import {
  showFailureNotification,
  showSuccessNotification,
} from "../../../ultils/notificationUtils";
import { fetchRoleData } from "../../../store/Slice/roleSlice";
import { fetchStaffData } from "../../../store/Slice/staffSlice";
import { callAPINoHead, callAPIPost } from "../../../ultils/axiosApi";
import { path } from "../../../ultils/constant";
import { useDispatch, useSelector } from "react-redux";

const { Item, List } = Form;
const { Option } = Select;
const AddUserForm = ({ onAddData }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const roleList = useSelector((state) => state.role.roleList);
  const staffList = useSelector((state) => state.staff.staffList);
  useEffect(() => {
    dispatch(fetchRoleData());
  }, [dispatch]);
  useEffect(() => {
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

  const handleAdd = () => {
    // Kiểm tra từng trường dữ liệu riêng lẻ
    if (
      formData.username.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.phone_number.trim() !== "" &&
      formData.role_id !== "" &&
      formData.staff_id !== ""
    ) {
      // Gửi dữ liệu lên server và xử lý kết quả thành công
      onAddData(formData);
      resetFormData();
      onClose();
    } else {
      console.log("Vui lòng điền đầy đủ thông tin trước khi thêm.");
    }
  };

  const handleChangeForm = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

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
        title="Create a new Role"
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
                  placeholder="Please enter new role"
                  onChange={(e) => handleChangeForm("username", e.target.value)}
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter a password" }]}
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
                  {staffList.map((staff) => (
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
