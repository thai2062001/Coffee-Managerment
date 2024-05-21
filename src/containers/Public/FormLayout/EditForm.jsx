import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import {
  showFailureNotification,
  showSuccessNotification,
} from "../../../ultils/notificationUtils";
import { getCurrentDate } from "../../../ultils/dateNowUtils";
import { fetchStaffData } from "../../../store/Slice/staffSlice";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../../ultils/constant";
import { callAPINoHead } from "../../../ultils/axiosApi";
import { formatDate } from "../../../components/MomentDate";
const { Option } = Select;
const { Item, List } = Form;
const EditForm = ({ onEditData, staff_id }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const getStaffById = (state, staffId) => {
    const staff = state.staff.staffList.find(
      (staff) => staff.staff_id === staffId
    );
    return staff ? staff : null;
  };

  const staffName = useSelector((state) => getStaffById(state, staff_id));

  const [formData, setFormData] = useState({
    staff_name: staffName ? staffName.staff_name : "",
    gender: staffName ? staffName.gender : "",
    birthday: staffName ? formatDate(staffName.birthday) : "",
    address: staffName ? staffName.address : "",
    phone_number: staffName ? staffName.phone_number : "",
    email: staffName ? staffName.email : "",
    position: staffName ? staffName.position : "",
    salary: staffName ? staffName.salary : "",
    start_date: staffName ? formatDate(staffName.start_date) : "",
  });

  useEffect(() => {
    // Kiểm tra nếu staffName có giá trị thì mới set giá trị cho formData
    if (staffName) {
      setFormData({
        staff_name: staffName.staff_name,
        gender: staffName.gender,
        birthday: formatDate(staffName.birthday),
        address: staffName.address,
        phone_number: staffName.phone_number,
        email: staffName.email,
        position: staffName.position,
        salary: staffName.salary,
        start_date: formatDate(staffName.start_date),
      });

      // Sử dụng form.setFieldsValue để cập nhật giá trị của input
      form.setFieldsValue({
        staff_name: staffName.staff_name,
        gender: staffName.gender,
        birthday: formatDate(staffName.birthday),
        address: staffName.address,
        phone_number: staffName.phone_number,
        email: staffName.email,
        position: staffName.position,
        salary: staffName.salary,
        start_date: formatDate(staffName.start_date),
      });
    }
  }, [staffName, form]);

  useEffect(() => {
    dispatch(fetchStaffData());
  }, [dispatch]);

  const onClose = () => {
    onEditData(null);
  };
  const resetFormData = () => {
    form.resetFields();
  };

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  const handleSubmit = async () => {
    try {
      // Gọi hàm callAPI để gửi yêu cầu chỉnh sửa vai trò
      const apiUrl = `${path.API_BASE_URL}${path.STAFF_API_URL}/${staff_id}`;
      console.log(formData);
      await callAPINoHead(apiUrl, "PATCH", formData);

      // Cập nhật dữ liệu trên giao diện sau khi chỉnh sửa thành công nếu cần
      dispatch(fetchStaffData());
      showSuccessNotification("Success", "Update Completed Successfully");
      onClose();
    } catch (error) {
      // Xử lý lỗi nếu cần
      showFailureNotification("Error", "Failed to update Staff");
      console.error("Failed to edit Staff:", error);
    }
  };

  return (
    <>
      <Drawer
        title="Edit Staff"
        width={720}
        onClose={onClose}
        visible={staff_id !== null}
        styles={{
          body: {
            paddingBottom: 80,
          },
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
        <Form
          onFinish={resetFormData}
          form={form}
          layout="vertical"
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="staff_name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter staff name",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter staff name"
                  value={formData.staff_name}
                  onChange={(e) => handleChange("staff_name", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  { required: true, message: "Please choose the gender" },
                ]}
              >
                <Select
                  placeholder="Please choose the gender"
                  value={formData.gender}
                  onChange={(value) => handleChange("gender", value)}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="birthday"
                label="Birthday"
                rules={[
                  { required: true, message: "Please select the birthday" },
                ]}
              >
                <Input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => handleChange("birthday", e.target.value)}
                />
              </Form.Item>
            </Col>
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input
                  placeholder="Please enter address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email address" },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Please enter email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
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
                  onChange={(value) => handleChange("position", value)}
                >
                  <Option value="Manager">Manager</Option>
                  <Option value="Staff">Staff</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="salary"
                label="Salary"
                rules={[{ required: true, message: "Please enter salary" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="Please enter salary"
                  value={formData.salary}
                  onChange={(value) => handleChange("salary", value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Col span={12}>
            <Form.Item
              name="start_date"
              label="Start Date"
              rules={[{ required: true, message: "Please select start date" }]}
            >
              <Input
                type="date"
                placeholder="Please select start date"
                value={formData.start_date}
                onChange={(e) => handleChange("start_date", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Form>
      </Drawer>
    </>
  );
};

export default EditForm;
