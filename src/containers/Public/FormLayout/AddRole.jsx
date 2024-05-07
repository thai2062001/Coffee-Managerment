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
import { callAPINoHead, callAPIPost } from "../../../ultils/axiosApi";
import { path } from "../../../ultils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRoleData } from "../../../store/Slice/roleSlice";
const { Item, List } = Form;
const { Option } = Select;
const AddRole = ({ onAddData }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    role_name: "",
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
    if (formData.role_name.trim() !== "") {
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
        New Role
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
                name="role_name"
                label="New Role"
                rules={[{ required: true, message: "Please enter new role" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter new role"
                  onChange={(e) =>
                    handleChangeForm("role_name", e.target.value)
                  }
                />
              </Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default AddRole;
