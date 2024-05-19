import React, { useState, useEffect } from "react";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoleData } from "../../../store/Slice/roleSlice";
import { path } from "../../../ultils/constant";
import { callAPINoHead } from "../../../ultils/axiosApi";

import {
  showFailureNotification,
  showSuccessNotification,
} from "../../../ultils/notificationUtils";

const EditRole = ({ onEditData, role_id }) => {
  const [form] = Form.useForm(); // Sử dụng Form.useForm để lấy form instance
  const dispatch = useDispatch();

  const getRoleNameById = (state, roleId) => {
    const role = state.role.roleList.find((role) => role.role_id === roleId);
    return role ? role.role_name : null;
  };

  const roleName = useSelector((state) => getRoleNameById(state, role_id));

  const [formData, setFormData] = useState({
    role_name: roleName || "", // Gán giá trị mặc định cho formData
  });

  useEffect(() => {
    dispatch(fetchRoleData());
  }, [dispatch]);

  useEffect(() => {
    // Kiểm tra nếu roleName có giá trị thì mới set giá trị cho formData
    if (roleName) {
      setFormData({
        role_name: roleName,
      });

      // Sử dụng form.setFieldsValue để cập nhật giá trị của input
      form.setFieldsValue({
        role_name: roleName,
      });
    }
  }, [roleName, form]); // Đảm bảo dependency array chứa form

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
      // Gọi hàm callAPI để gửi yêu cầu chỉnh sửa vai trò
      const apiUrl = `${path.API_BASE_URL}${path.ROLE_API_URL}/${role_id}`;
      await callAPINoHead(apiUrl, "PATCH", formData);
      // Cập nhật dữ liệu trên giao diện sau khi chỉnh sửa thành công nếu cần
      dispatch(fetchRoleData());
      showSuccessNotification("Success", "Update Completed Successfully");
      onClose();
    } catch (error) {
      // Xử lý lỗi nếu cần
      showFailureNotification("Error", "Failed to update role");
      console.error("Failed to edit role:", error);
    }
  };

  const resetFormData = () => {
    setFormData({
      role_name: "",
    });
    form.resetFields();
  };

  return (
    <>
      <Drawer
        title="Edit Role"
        width={720}
        onClose={onClose}
        visible={role_id !== null}
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
              onClick={handleSubmit} // Sử dụng handleSubmit khi nhấn nút "Submit"
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
                name="role_name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                {/* Sử dụng giá trị từ state cho input và xử lý sự kiện onChange */}
                <Input
                  placeholder="Please enter user name"
                  value={formData.role_name}
                  onChange={(e) => handleChange("role_name", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EditRole;
