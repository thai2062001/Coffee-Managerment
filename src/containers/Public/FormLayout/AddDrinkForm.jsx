import React, { useState, useEffect } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Upload,
  Row,
  Space,
  Select,
} from "antd";
import {
  showFailureNotification,
  showSuccessNotification,
} from "../../../ultils/notificationUtils";
import { callAPINoHead, callAPIPost } from "../../../ultils/axiosApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredientData } from "../../../store/Slice/ingredientSlice";
import { path } from "../../../ultils/constant";
const { Item, List } = Form;
const { Option } = Select;
const AddDrinkForm = ({ onAddData }) => {
  const [open, setOpen] = useState(false);
  const [ingredientSource, setIngredientSource] = useState([]);
  const dispatch = useDispatch();
  const ingredientList = useSelector(
    (state) => state.ingredient.ingredientList
  );
  useEffect(() => {
    console.log("Ingre list from Redux:", ingredientList);
  }, [ingredientList]);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    drink_name: "",
    price: "",
    image_url: "",
    drink_detail: [],
  });
  useEffect(() => {
    dispatch(fetchIngredientData());
  }, [dispatch]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const resetFormData = () => {
    form.resetFields();
    setFormData({
      drink_name: "",
      price: "",
      image_url: "",
      drink_detail: [],
    });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageUrl = reader.result;
      setFormData({
        ...formData,
        image_url: imageUrl,
      });
    };
    return false; // Prevent default upload behavior
  };

  const handleAdd = async () => {
    // Kiểm tra từng trường dữ liệu riêng lẻ
    console.log("formData:", formData);
    if (
      formData.drink_name.trim() !== "" &&
      formData.price.trim() !== "" &&
      formData.image_url
    ) {
      try {
        // Gọi API POST để thêm dữ liệu mới
        const newData = await callAPIPost(
          path.API_BASE_URL + path.DRINK_API_URL,
          formData
        );
        console.log("New data added:", newData);
        showSuccessNotification("Success", "Addition Completed Successfully");
        resetFormData();
        onClose();
      } catch (error) {
        console.error("Failed to add new data:", error);
        showFailureNotification(
          "Error",
          "Failed to add new data. Please try again later."
        );
      }
    } else {
      // Hiển thị thông báo lỗi nếu không cung cấp đủ thông tin
      showFailureNotification(
        "Error",
        "Please provide all necessary information before adding"
      );
    }
  };

  const handleIngredientChange = (index, key, value) => {
    const newDrinkDetail = [...formData.drink_detail];
    newDrinkDetail[index] = {
      ...newDrinkDetail[index],
      [key]: value,
    };
    setFormData({
      ...formData,
      drink_detail: newDrinkDetail,
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
        New Drink
      </Button>
      <Drawer
        title="Create a new Drink"
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
              <Item
                name="drink_name"
                label="Name"
                rules={[{ required: true, message: "Please enter drink name" }]}
              >
                <Input
                  placeholder="Please enter drink name"
                  onChange={(e) =>
                    handleChangeForm("drink_name", e.target.value)
                  }
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please enter Price" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  addonAfter="VND"
                  placeholder="Please enter Price"
                  onChange={(e) => handleChangeForm("price", e.target.value)}
                />
              </Item>
            </Col>
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
                          label="Ingredient"
                        >
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Select ingredient"
                            onChange={(value) =>
                              handleIngredientChange(
                                fieldKey,
                                "ingredient_id",
                                value
                              )
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
                        </Item>
                      </div>
                      <div style={{ flex: "0 0 30%", marginRight: "20px" }}>
                        <Item
                          name={[name, "weight"]}
                          fieldKey={[fieldKey, "weight"]}
                          rules={[
                            {
                              required: true,
                              message: "Please enter the weight",
                            },
                          ]}
                          label="Weight (grams)"
                        >
                          <Input
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              handleIngredientChange(
                                fieldKey,
                                "weight",
                                e.target.value
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
                  <div style={{ marginTop: "30px", marginLeft: "40px" }}>
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
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Upload"
                valuePropName="image_url"
                getValueFromEvent={normFile}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  showUploadList={false} // Hide default upload list
                >
                  {formData.image_url ? (
                    <img
                      src={formData.image_url}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddDrinkForm;
