import React, { useEffect, useState } from "react";
import axios from "axios";
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
import unhashToken from "../../../components/unhashToken";
import { useDispatch, useSelector } from "react-redux";
import { fetchEquipmentData } from "../../../store/Slice/equipmentTypeSlice";
import { fetchStorageData } from "../../../store/Slice/storageSlice";
const { Option } = Select;
const AddForm = ({ onAddData }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const equipTypeList = useSelector((state) => state.type.equipType);
  const storageList = useSelector((state) => state.storage.storageList);

  const [userId, setUserId] = useState("");
  const access_Token = localStorage.getItem("access-token");

  useEffect(() => {
    const decodedToken = unhashToken(access_Token);
    if (decodedToken) {
      // Thực hiện các hành động với thông tin đã giải mã từ token
      console.log("Thông tin từ token:", decodedToken);
      setUserId(decodedToken.user_id);
    } else {
      // Xử lý khi không thể giải mã token
      console.log("Không thể giải mã token");
    }
  }, [access_Token]);
  useEffect(() => {
    dispatch(fetchEquipmentData());
  }, [dispatch]);

  const uniqueValues = (arr) => {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const uniqueGoodsUnits = uniqueValues(
    storageList.map((storage) => storage.goods_unit)
  );

  const [formData, setFormData] = useState({
    goods_name: "",
    cost_price: "",
    goods_unit: "",
    equipmenttype_id: "",
    quantity: 1,
    arrival_date: getCurrentDate(),
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const resetFormData = (values) => {
    form.resetFields();
  };

  const handleAdd = async () => {
    try {
      // Kiểm tra từng trường dữ liệu riêng lẻ
      if (
        formData.goods_name &&
        formData.cost_price &&
        formData.goods_unit &&
        formData.equipmenttype_id
      ) {
        const url = "http://localhost:5000/storage";
        const data = formData;

        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${access_Token}`,
            "Content-Type": "application/json",
          },
        });
        localStorage.setItem(
          "successMessage",
          JSON.stringify({
            title: "Success",
            message: "Addition Completed Successfully",
          })
        );
        // Reload trang sau 2 giây

        // Xử lý phản hồi ở đây nếu cần
        console.log("Response:", response);

        // Reset form và đóng Drawer
        resetFormData();
        onClose();

        // Thông báo thành công nếu cần
        showSuccessNotification("Success", "Storage added successfully.");
      } else {
        showFailureNotification(
          "Error",
          "Please provide all necessary information before adding"
        );
        console.log(formData);
      }
    } catch (error) {
      // Xử lý lỗi ở đây nếu cần
      console.error("API call failed:", error);
      showFailureNotification("Error", "Failed to add storage.");
    }
  };

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
        New Storage
      </Button>
      <Drawer
        title="Create a new Storage"
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
                  {equipTypeList.map((item) => (
                    <Option
                      key={item.equipmenttype_id}
                      value={item.equipmenttype_id}
                    >
                      {item.equipmenttype_name}
                    </Option>
                  ))}
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
        </Form>
      </Drawer>
    </>
  );
};

export default AddForm;
