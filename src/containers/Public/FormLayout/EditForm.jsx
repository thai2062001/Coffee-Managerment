import React, { useState } from "react";
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

const { Option } = Select;
const EditForm = ({ onEditData }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    goods_name: "",
    cost_price: "",
    goods_unit: "",
    equipmenttype_id: "",
    quantity: 1,
    user_id: 1,
    user_id_deleted: "null",
    deleted: 0,
    arrival_date: getCurrentDate(),
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

  const handleEdit = () => {};

  const handleChange = (key, value) => {
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
        Edit Storage
      </Button>
      <Drawer
        title="Edit Storage"
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
            <Button
              className="bg-[#5BBCFF]"
              onClick={handleEdit}
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
            <Col span={12}>
              <Form.Item
                name="goods_unit"
                label="Unit"
                rules={[
                  {
                    required: true,
                    message: "Please choose the Unit",
                  },
                ]}
              >
                <Select
                  placeholder="Please choose the Unit"
                  onChange={(value) => handleChange("goods_unit", value)}
                >
                  <Option value="Kilogram">Kilogram</Option>
                  <Option value="Gram">Gram</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cost_price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: "Please enter Price",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  addonAfter="VND"
                  placeholder="Please enter Price"
                  onChange={(e) => handleChange("cost_price", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="equipmenttype_id"
                label="Equipmenttype_id"
                rules={[
                  {
                    required: true,
                    message: "Please choose  equipmenttype_id",
                  },
                ]}
              >
                <Select
                  placeholder="Please choose the equipmenttype_id"
                  onChange={(value) => handleChange("equipmenttype_id", value)}
                >
                  <Option value="0">Ingredient</Option>
                  <Option value="1">Shop tools</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                  {
                    required: true,
                    message: "Please enter a quantity",
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  defaultValue={1}
                  onChange={(value) => handleChange("quantity", value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                name="user_id"
                label="User_ID"
                rules={[
                  {
                    required: true,
                    message: "Please enter User_ID",
                  },
                ]}
              >
                <Input
                  defaultValue={1}
                  disabled
                  placeholder="Please enter User_ID"
                  onChange={(e) => handleChange("user_id", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="user_id_deleted"
                label="User_id_deleted"
                rules={[
                  {
                    required: true,
                    message: "Please enter user_id_deleted",
                  },
                ]}
              >
                <Input
                  disabled
                  placeholder="Please enter user_id_deleted"
                  onChange={(e) =>
                    handleChange("user_id_deleted", e.target.value)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="deleted"
                label="Deleted"
                rules={[
                  {
                    required: true,
                    message: "Please enter Deleted",
                  },
                ]}
              >
                <Input
                  disabled
                  defaultValue={0}
                  placeholder="Please enter Deleted"
                  onChange={(e) => handleChange("deleted", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EditForm;
