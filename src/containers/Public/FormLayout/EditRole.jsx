// EditRole.js
import React, { useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";

const EditRole = ({ onEditData, role_id }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    role_name: "",
  });

  const onClose = () => {
    onEditData(null); // Đóng Drawer khi click vào nút "Cancel"
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
              onClick={resetFormData}
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
                name="goods_name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter user name"
                  onChange={(e) => handleChange("goods_name", e.target.value)}
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
