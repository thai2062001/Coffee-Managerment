import React, { useState, useEffect } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Space, Select } from "antd";
import {
  showFailureNotification,
  showSuccessNotification,
} from "../../../ultils/notificationUtils";
import { callAPIPost } from "../../../ultils/axiosApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredientData } from "../../../store/Slice/ingredientSlice";
import { path } from "../../../ultils/constant";
import { fetchDrinkData } from "../../../store/Slice/drinkSlice";

const { Item, List } = Form;
const { Option } = Select;

const AddRecipe = ({ onAddData }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const ingredientList = useSelector(
    (state) => state.ingredient.ingredientList
  );
  const drinkList = useSelector((state) => state.drink.drinkList);

  useEffect(() => {
    dispatch(fetchIngredientData());
    dispatch(fetchDrinkData());
  }, [dispatch]);

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    drink_id: "",
    drink_details: [],
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
      drink_id: "",
      drink_details: [],
    });
  };

  const handleAdd = async () => {
    // Kiểm tra dữ liệu
    if (
      formData.drink_id &&
      formData.drink_details.length > 0 &&
      formData.drink_details.every(
        (detail) => detail.ingredient_id && detail.ingredient_weight
      )
    ) {
      try {
        const newData = await callAPIPost(
          path.API_BASE_URL + path.RECIPE_API_URL,
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

  const handleIngredientChange = (index, key, value) => {
    const newDrinkDetail = [...formData.drink_details];

    // Check for duplicate ingredients only if the ingredient_id is being changed
    if (
      key === "ingredient_id" &&
      newDrinkDetail.some(
        (detail, i) => detail.ingredient_id === value && i !== index
      )
    ) {
      showFailureNotification("Error", "Ingredient already selected");
      return;
    }

    newDrinkDetail[index] = {
      ...newDrinkDetail[index],
      [key]: value,
    };
    setFormData({
      ...formData,
      drink_details: newDrinkDetail,
    });
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
        New Recipe
      </Button>
      <Drawer
        title="Create a new Recipe"
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
          <Row gutter={16}>
            <Col span={12}>
              <Item
                name="drink_id"
                label="Drink Name"
                
                rules={[
                  { required: true, message: "Please select a drink name" },
                ]}
              >
                <Select
                  style={{ width: "100%", minWidth: "300px" }} // Đặt chiều rộng cố định
                  placeholder="Please select a drink"
                  onChange={(value) => handleChangeForm("drink_id", value)}
                >
                  {drinkList.map((drink) => (
                    <Option key={drink.drink_id} value={drink.drink_id}>
                      {drink.drink_name}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <List name="ingredients" style={{ width: "100%" }}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey }) => (
                    <div
                      key={key}
                      style={{ display: "flex", marginBottom: "20px" }}
                    >
                      <div style={{ flex: "0 0 60%", marginRight: "20px" }}>
                        <Item
                          name={[name, "ingredient_id"]}
                          fieldKey={[fieldKey, "ingredient_id"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select an ingredient",
                            },
                          ]}
                          label={
                            <span style={{ marginLeft: "8px" }}>
                              Ingredient
                            </span>
                          }
                        >
                          <Select
                            style={{
                              marginLeft: "8px",
                              width: "100%",
                              minWidth: "200px",
                            }} // Đặt chiều rộng cố định
                            placeholder="Select ingredient"
                            onChange={(value) => {
                              handleIngredientChange(
                                fieldKey,
                                "ingredient_id",
                                value
                              );
                            }}
                          >
                            {ingredientList.map((ingredient) => (
                              <Option
                                key={ingredient.ingredient_id}
                                value={ingredient.ingredient_id}
                              >
                                {ingredient.ingredient_name}
                              </Option>
                            ))}
                          </Select>
                        </Item>
                      </div>
                      <div style={{ flex: "0 0 30%", marginRight: "20px" }}>
                        <Item
                          name={[name, "ingredient_weight"]}
                          fieldKey={[fieldKey, "ingredient_weight"]}
                          rules={[
                            {
                              required: true,
                              message: "Please enter the weight",
                            },
                          ]}
                          label="Weight (grams)"
                        >
                          <Input
                            style={{ width: "100%", minWidth: "150px" }}
                            onChange={(e) =>
                              handleIngredientChange(
                                fieldKey,
                                "ingredient_weight",
                                e.target.value // Dữ liệu trọng lượng lưu trữ dưới dạng chuỗi
                              )
                            }
                          />
                        </Item>
                      </div>
                      <div
                        style={{
                          flex: "0 0 10%",
                          display: "flex",
                          alignItems: "center",
                          marginTop: "5px",
                        }}
                      >
                        <Button
                          type="danger"
                          onClick={() => remove(name)}
                          icon={<MinusCircleOutlined />}
                        />
                      </div>
                    </div>
                  ))}
                  <div style={{ width: "100%", marginTop: "20px" }}>
                    {" "}
                    {/* Đặt chiều rộng 100% và margin top */}
                    <Item>
                      <Button
                        type="dashed"
                        onClick={add}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Ingredient
                      </Button>
                    </Item>
                  </div>
                </>
              )}
            </List>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddRecipe;
