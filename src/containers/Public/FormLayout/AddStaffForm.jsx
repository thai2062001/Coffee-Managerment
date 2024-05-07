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
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../../ultils/constant";
const { Item, List } = Form;
const { Option } = Select;
const AddStaffForm = ({ onAddData }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  //   const ingredientList = useSelector(
  //     (state) => state.ingredient.ingredientList
  //   );

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    staff_name: "",
    gender: "",
    birthday: null,
    address: "",
    phone_number: "",
    email: "",
    position: "",
    salary: parseFloat("1000.50"),
    start_date: null,
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const resetFormData = () => {
    form.resetFields();
    setFormData({
      staff_name: "",
      gender: "",
      birthday: null,
      address: "",
      phone_number: "",
      email: "",
      position: "",
      salary: parseFloat("1000.50"),
      start_date: null,
    });
  };

  const handleAdd = async () => {
    // Kiểm tra từng trường dữ liệu riêng lẻ
    console.log("formData:", formData);
    if (
      formData.staff_name.trim() !== "" &&
      formData.gender.trim() !== "" &&
      formData.birthday.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.phone_number.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.position.trim() !== "" &&
      formData.salary.trim() !== "" &&
      formData.start_date.trim() !== ""
    ) {
      try {
        // Gọi API POST để thêm dữ liệu mới
        const response = await axios.post(
          path.API_BASE_URL + path.STAFF_API_URL,
          formData
        );
        const newData = response.data; // Dữ liệu trả về từ API
        console.log("New data added:", newData);
        showSuccessNotification("Success", "Addition Completed Successfully");
        resetFormData();
        onClose();
      } catch (error) {
        console.error("Failed to add new data:", error);
        showFailureNotification(
          "Error",
          "Failed to add new data. Please try again later."
        );
      }
    } else {
      // Hiển thị thông báo lỗi nếu không cung cấp đủ thông tin
      showFailureNotification(
        "Error",
        "Please provide all necessary information before adding"
      );
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
        New Staff
      </Button>
      <Drawer
        title="Create a new Staff"
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
                name="staff_name"
                label="Name"
                rules={[{ required: true, message: "Please enter Staff Name" }]}
              >
                <Input
                  placeholder="Please enter Staff Name"
                  onChange={(e) =>
                    handleChangeForm("staff_name", e.target.value)
                  }
                />
              </Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please choose the gender",
                  },
                ]}
              >
                <Select
                  placeholder="Please choose the gender"
                  onChange={(value) => handleChangeForm("gender", value)}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Item
                name="birthday"
                label="Birthday"
                rules={[{ required: true, message: "Please select Birthday" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Select Birthday"
                  onChange={(date, dateString) =>
                    handleChangeForm("birthday", dateString)
                  }
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter address"
                  onChange={(e) => handleChangeForm("address", e.target.value)}
                />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                name="phone_number"
                label="Phone"
                rules={[
                  { required: true, message: "Please enter Phone Number" },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter phone number"
                  onChange={(e) =>
                    handleChangeForm("phone_number", e.target.value)
                  }
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter Email" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter Email"
                  onChange={(e) => handleChangeForm("email", e.target.value)}
                />
              </Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="position"
                label="Position"
                rules={[
                  {
                    required: true,
                    message: "Please choose the Position",
                  },
                ]}
              >
                <Select
                  placeholder="Please choose the Position"
                  onChange={(value) => handleChangeForm("position", value)}
                >
                  <Option value="Manager">Manager</Option>
                  <Option value="Staff">Staff</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Item
                name="salary"
                label="Salary"
                rules={[{ required: true, message: "Please enter Salary" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  addonAfter="VND"
                  placeholder="Please enter Salary"
                  onChange={(e) => handleChangeForm("salary", e.target.value)}
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="start_date"
                label="Start Date"
                rules={[
                  { required: true, message: "Please select Start Date" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Select Start Date"
                  onChange={(date, dateString) =>
                    handleChangeForm("start_date", dateString)
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
export default AddStaffForm;
