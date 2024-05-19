import React, { useState, useEffect } from "react";
import { Button, Col, Drawer, Form, Select, Input, Row, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../../ultils/constant";
import { callAPINoHead } from "../../../ultils/axiosApi";
import { fetchStorageData } from "./../../../store/Slice/storageSlice";
import {
  showFailureNotification,
  showSuccessNotification,
} from "../../../ultils/notificationUtils";

const EditStorage = ({ onEditData, storage_id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // Fetch storage data from the Redux store

  const getStorageById = (state, storageId) => {
    const storage = state.storage.storageList.find(
      (storage) => storage.storage_id === storageId
    );
    return storage ? storage : null;
  };

  const storageData = useSelector((state) => getStorageById(state, storage_id));
  const storageList = useSelector((state) => state.storage.storageList);

  const uniqueValues = (arr) => {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const uniqueGoodsUnits = uniqueValues(
    storageList.map((storage) => storage.goods_unit)
  );
  // Initialize formData state
  const [formData, setFormData] = useState({
    goods_name: "",
    cost_price: "",
    quantity: "",
    goods_unit: "",
    equipmenttype_id: "",
    arrival_date: "",
  });

  // Fetch storage data from the database on component mount
  useEffect(() => {
    dispatch(fetchStorageData());
  }, [dispatch]);

  // Update formData state when storageData changes
  useEffect(() => {
    if (storageData) {
      setFormData({
        goods_name: storageData.goods_name || "",
        cost_price: storageData.cost_price || "",
        quantity: storageData.quantity || "",
        goods_unit: storageData.goods_unit || "",
        equipmenttype_id: storageData.equipmenttype_id || "",
        arrival_date: storageData.arrival_date || "",
      });

      form.setFieldsValue({
        goods_name: storageData.goods_name || "",
        cost_price: storageData.cost_price || "",
        quantity: storageData.quantity || "",
        goods_unit: storageData.goods_unit || "",
        equipmenttype_id: storageData.equipmenttype_id || "",
        arrival_date: storageData.arrival_date || "",
      });
    }
  }, [storageData, form]);

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
      console.log(formData);
      const apiUrl = `${path.API_BASE_URL}${path.STORAGE_API_URL}/${storage_id}`;
      await callAPINoHead(apiUrl, "PATCH", formData);
      dispatch(fetchStorageData());
      showSuccessNotification("Success", "Update Completed Successfully");
      onClose();
    } catch (error) {
      showFailureNotification("Error", "Failed to update storage");
      console.error("Failed to edit storage:", error);
    }
  };

  const resetFormData = () => {
    setFormData({
      goods_name: "",
      cost_price: "",
      quantity: "",
      goods_unit: "",
      equipmenttype_id: "",
      arrival_date: "",
    });
    form.resetFields();
  };

  return (
    <Drawer
      title="Edit Storage"
      width={720}
      onClose={onClose}
      visible={storage_id !== null}
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
              label="Goods Name"
              rules={[
                {
                  required: true,
                  message: "Please enter goods name",
                },
              ]}
            >
              <Input
                placeholder="Please enter goods name"
                value={formData.goods_name}
                onChange={(e) => handleChange("goods_name", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="cost_price"
              label="Cost Price"
              rules={[
                {
                  required: true,
                  message: "Please enter cost price",
                },
              ]}
            >
              <Input
                placeholder="Please enter cost price"
                value={formData.cost_price}
                onChange={(e) => handleChange("cost_price", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[
                {
                  required: true,
                  message: "Please enter quantity",
                },
              ]}
            >
              <Input
                placeholder="Please enter quantity"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="created_by"
              initialValue={storageData.created_by}
              label="Created By"
              rules={[
                {
                  required: true,
                  message: "Please enter created_by",
                },
              ]}
            >
              <Input
                placeholder="Please enter created_by"
                value={formData.created_by}
                disabled
                onChange={(e) => handleChange("created_by", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
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
                {uniqueGoodsUnits.map((unit) => (
                  <Option key={unit} value={unit}>
                    {capitalizeFirstLetter(unit)}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="equipmenttype_id"
              label="Equipment Type ID"
              rules={[
                {
                  required: true,
                  message: "Please enter equipment type ID",
                },
              ]}
            >
              <Input
                placeholder="Please enter equipment type ID"
                value={formData.equipmenttype_id}
                onChange={(e) =>
                  handleChange("equipmenttype_id", e.target.value)
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="arrival_date"
              label="Arrival Date"
              rules={[
                {
                  required: true,
                  message: "Please enter arrival date",
                },
              ]}
            >
              <Input
                placeholder="Please enter arrival date"
                value={formData.arrival_date}
                onChange={(e) => handleChange("arrival_date", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default EditStorage;
