import React, { useState, useEffect } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Space, Select } from "antd";
import {
  showFailureNotification,
  showSuccessNotification,
} from "../../../ultils/notificationUtils";
import { callAPIPost } from "../../../ultils/axiosApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuData } from "../../../store/Slice/MenuSlice";
import { fetchDrinkData } from "../../../store/Slice/drinkSlice";
import { path } from "../../../ultils/constant";

const { Item, List } = Form;
const { Option } = Select;

const AddMenu = ({ onAddData }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const menuList = useSelector((state) => state.menu.menuList);
  const drinkList = useSelector((state) => state.drink.drinkList);

  useEffect(() => {
    dispatch(fetchMenuData());
    dispatch(fetchDrinkData());
  }, [dispatch]);

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    menu_name: "",
    menu_details: [],
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
      menu_name: "",
      menu_details: [],
    });
  };

  const handleAdd = async () => {
    if (formData.menu_name && formData.menu_details.length > 0) {
      console.log(formData);
      try {
        const newData = await callAPIPost(
          path.API_BASE_URL + path.MENU_API_URL,
          formData
        );
        showSuccessNotification("Success", "Addition Completed Successfully");
        resetFormData();
        onClose();
      } catch (error) {
        showFailureNotification(
          "Error",
          "Failed to add new data. Please try again later."
        );
      }
    } else {
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

  const handleAddDrink = () => {
    setFormData({
      ...formData,
      menu_details: [...formData.menu_details, { drink_id: "" }],
    });
  };

  const handleDrinkChange = (index, value) => {
    const newMenuDetails = formData.menu_details.map((detail, i) =>
      i === index ? { ...detail, drink_id: value } : detail
    );
    setFormData({
      ...formData,
      menu_details: newMenuDetails,
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
        New Menu
      </Button>
      <Drawer
        title="Create a new Menu"
        width={720}
        onClose={onClose}
        visible={open}
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
          <Item
            name="menu_name"
            label="Menu Name"
            rules={[{ required: true, message: "Please enter the menu name" }]}
          >
            <Input
              placeholder="Please enter the menu name"
              onChange={(e) => handleChangeForm("menu_name", e.target.value)}
            />
          </Item>
          {formData.menu_details.map((detail, index) => (
            <Row key={index} gutter={16}>
              <Col span={20}>
                <Item
                  name={`drink_name_${index}`}
                  label={`Drink Name ${index + 1}`}
                  rules={[{ required: true, message: "Please select a drink" }]}
                >
                  <Select
                    placeholder="Select a drink"
                    onChange={(value) => handleDrinkChange(index, value)}
                  >
                    {drinkList.map((drink) => (
                      <Option key={drink.drink_id} value={drink.drink_id}>
                        {drink.drink_name}
                      </Option>
                    ))}
                  </Select>
                </Item>
              </Col>
              <Col span={4}>
                <Button
                  icon={<MinusCircleOutlined />}
                  type="danger"
                  onClick={() => {
                    const newMenuDetails = formData.menu_details.filter(
                      (_, i) => i !== index
                    );
                    setFormData({
                      ...formData,
                      menu_details: newMenuDetails,
                    });
                  }}
                />
              </Col>
            </Row>
          ))}
          <Button
            type="dashed"
            onClick={handleAddDrink}
            icon={<PlusOutlined />}
            style={{ width: "100%", marginBottom: 20 }}
          >
            Add Drink
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default AddMenu;
