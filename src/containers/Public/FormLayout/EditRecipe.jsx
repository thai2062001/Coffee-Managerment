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
import { fetchRecipeData } from "../../../store/Slice/recipeSlice";
import { fetchIngredientData } from "../../../store/Slice/ingredientSlice";

const { Option } = Select;

const EditRecipe = ({ onEditData, drink_id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const ingredientList = useSelector(
    (state) => state.ingredient.ingredientList
  );
  const drinkList = useSelector((state) => state.drink.drinkList);
  const getRecipeById = (state, recipeId) => {
    return state.recipe.recipeList.find(
      (recipe) => recipe.drink_id === recipeId
    );
  };

  const RecipeList = useSelector((state) => getRecipeById(state, drink_id));
  console.log(RecipeList);

  const [initialDetails, setInitialDetails] = useState([]);
  const [formData, setFormData] = useState({
    drink_name: "",
    drink_details: [],
  });

  useEffect(() => {
    if (RecipeList) {
      const foundDrink = drinkList.find(
        (drink) => drink.drink_id === RecipeList.drink_id
      );
      if (foundDrink) {
        setFormData({
          drink_name: foundDrink.drink_name,
          drink_details: RecipeList.drink_details,
        });
        setInitialDetails(RecipeList.drink_details);
        form.setFieldsValue({
          drink_name: foundDrink.drink_name,
          drink_details: RecipeList.drink_details,
        });
      }
    }
  }, [RecipeList, form, drinkList]);

  useEffect(() => {
    dispatch(fetchDrinkData());
    dispatch(fetchRecipeData());
    dispatch(fetchIngredientData());
  }, [dispatch]);

  const resetFormData = () => {
    form.resetFields();
    setFormData({
      drink_name: "",
      drink_details: [],
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

  const handleDetailChange = (index, key, value) => {
    const newDetails = formData.drink_details.map((detail, i) =>
      i === index ? { ...detail, [key]: value } : detail
    );
    setFormData({
      ...formData,
      drink_details: newDetails,
    });
    form.setFieldsValue({
      drink_details: newDetails,
    });
  };

  const handleSubmit = async () => {
    try {
      const updatedDetails = formData.drink_details.map((detail, index) => ({
        ingredient_id: initialDetails[index].ingredient_id,
        ingredient_weight: detail.ingredient_weight * 1000,
        ingredient_id_update:
          detail.ingredient_id_update || detail.ingredient_id,
      }));

      const apiUrl = `${path.API_BASE_URL}${path.RECIPE_API_URL}/${drink_id}`;
      const submitData = {
        drink_details: updatedDetails,
      };
      console.log(submitData);
      await axios.patch(apiUrl, submitData);
      showSuccessNotification("Success", "Update Completed Successfully");
      onClose();
    } catch (error) {
      showFailureNotification("Error", "Failed to update recipe");
      console.error("Failed to edit recipe:", error);
    }
  };

  return (
    <Drawer
      title="Edit Recipe"
      width={720}
      onClose={onClose}
      visible={drink_id !== null}
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
          name="drink_name"
          label="Drink Name"
          rules={[{ required: true, message: "Please enter the drink name" }]}
        >
          <Input
            placeholder="Please enter the drink name"
            value={formData.drink_name}
            onChange={(e) => handleChange("drink_name", e.target.value)}
          />
        </Form.Item>
        <Form.List name="drink_details">
          {(fields) => (
            <>
              {fields.map((field, index) => (
                <Row gutter={16} key={field.key}>
                  <Col span={8}>
                    <Form.Item
                      name={[field.name, "ingredient_id"]}
                      fieldKey={[field.fieldKey, "ingredient_id"]}
                      label={`Ingredient ${index + 1}`}
                      rules={[
                        {
                          required: true,
                          message: "Please select an ingredient",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select an ingredient"
                        value={formData.drink_details[index]?.ingredient_id}
                        onChange={(value) =>
                          handleDetailChange(index, "ingredient_id", value)
                        }
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
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name={[field.name, "ingredient_weight"]}
                      fieldKey={[field.fieldKey, "ingredient_weight"]}
                      label={`Weight ${index + 1} (Kg) `}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the ingredient weight",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter weight"
                        value={formData.drink_details[index]?.ingredient_weight}
                        onChange={(e) =>
                          handleDetailChange(
                            index,
                            "ingredient_weight",
                            e.target.value
                          )
                        }
                      />
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

export default EditRecipe;
