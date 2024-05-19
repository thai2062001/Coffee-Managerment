import React, { useState, useEffect } from "react";
import { Button, Col, Drawer, Form, Input, Row, Space, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { path } from "../../../ultils/constant";
import {
  showFailureNotification,
  showSuccessNotification,
} from "../../../ultils/notificationUtils";
import { fetchDrinkData } from "../../../store/Slice/drinkSlice";
import { fetchMenuDetailsData } from "../../../store/Slice/MenuDetail";

const { Option } = Select;

const EditMenu = ({ onEditData, menu_id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const drinkList = useSelector((state) => state.drink.drinkList);

  const getMenuById = (state, menuId) => {
    return state.menuDetail.menuDetailList.find(
      (menu) => menu.menu_id === menuId
    );
  };
  const menuList = useSelector((state) => getMenuById(state, menu_id));

  const [initialDetails, setInitialDetails] = useState([]);
  const [formData, setFormData] = useState({
    menu_name: "",
    menudetails: [],
  });

  useEffect(() => {
    if (menuList) {
      setFormData({
        menu_name: menuList.menu_name,
        menudetails: menuList.menudetails,
      });
      setInitialDetails(menuList.menudetails);
      form.setFieldsValue({
        menu_name: menuList.menu_name,
        menudetails: menuList.menudetails,
      });
    }
  }, [menuList, form]);

  useEffect(() => {
    dispatch(fetchDrinkData());
    dispatch(fetchMenuDetailsData());
  }, [dispatch]);

  const resetFormData = () => {
    form.resetFields();
    setFormData({
      menu_name: "",
      menudetails: [],
    });
  };

  const onClose = () => {
    onEditData(null);
  };

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    form.setFieldsValue({
      [key]: value,
    });
  };

  const handleDrinkChange = (index, value) => {
    const newMenuDetails = formData.menudetails.map((detail, i) =>
      i === index ? { ...detail, drink_id: value } : detail
    );
    setFormData({
      ...formData,
      menudetails: newMenuDetails,
    });
    form.setFieldsValue({
      menudetails: newMenuDetails,
    });
  };

  const handleSubmit = async () => {
    try {
      const updatedDetails = formData.menudetails.map((detail, index) => ({
        drink_id: initialDetails[index].drink_id,
        drink_id_update: detail.drink_id,
      }));

      const apiUrl = `${path.API_BASE_URL}${path.MENUDETAILS_API_URL}/${menu_id}`;
      const submitData = {
        menu_name: formData.menu_name,
        menu_details: updatedDetails,
      };
      console.log(submitData);
      await axios.patch(apiUrl, submitData);
      showSuccessNotification("Success", "Update Completed Successfully");
      onClose();
    } catch (error) {
      showFailureNotification("Error", "Failed to update menu");
      console.error("Failed to edit menu:", error);
    }
  };

  return (
    <Drawer
      title="Edit Menu"
      width={720}
      onClose={onClose}
      visible={menu_id !== null}
      bodyStyle={{ paddingBottom: 80 }}
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
        <Form.Item
          name="menu_name"
          label="Menu Name"
          rules={[{ required: true, message: "Please enter the menu name" }]}
        >
          <Input
            placeholder="Please enter the menu name"
            value={formData.menu_name}
            onChange={(e) => handleChange("menu_name", e.target.value)}
          />
        </Form.Item>
        <Form.List name="menudetails">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Row gutter={16} key={field.key}>
                  <Col span={20}>
                    <Form.Item
                      name={[field.name, "drink_id"]}
                      fieldKey={[field.fieldKey, "drink_id"]}
                      label={`Drink ${index + 1}`}
                      rules={[
                        { required: true, message: "Please select a drink" },
                      ]}
                    >
                      <Select
                        placeholder="Select a drink"
                        value={formData.menudetails[index]?.drink_id}
                        onChange={(value) => handleDrinkChange(index, value)}
                      >
                        {drinkList.map((drink) => (
                          <Option key={drink.drink_id} value={drink.drink_id}>
                            {drink.drink_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Form.List>
      </Form>
    </Drawer>
  );
};

export default EditMenu;
