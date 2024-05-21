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
import { callAPIPostMulti } from "../../../ultils/axiosApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredientData } from "../../../store/Slice/ingredientSlice";
import { path } from "../../../ultils/constant";
const { Item, List } = Form;
const { Option } = Select;

const AddDrinkForm = ({ onAddData }) => {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [drinkName, setDrinkName] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const ingredientList = useSelector(
    (state) => state.ingredient.ingredientList
  );

  useEffect(() => {
    dispatch(fetchIngredientData());
  }, [dispatch]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    resetFormData();
  };

  const resetFormData = () => {
    setDrinkName("");
    setPrice("");
    setImageFile(null);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const handleAdd = async () => {
    if (drinkName.trim() !== "" && price.trim() !== "" && imageFile) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("drink_name", drinkName);
        formDataToSend.append("price", price);
        formDataToSend.append("image_url", imageFile);
        for (let [key, value] of formDataToSend.entries()) {
          console.log(key, value);
        }

        const newData = await callAPIPostMulti(
          path.API_BASE_URL + path.DRINK_API_URL,
          formDataToSend
        );
        showSuccessNotification("Success", "Addition Completed Successfully");
        resetFormData();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
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
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button className="bg-[#5BBCFF]" onClick={handleAdd} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Name"
                rules={[{ required: true, message: "Please enter drink name" }]}
              >
                <Input
                  placeholder="Please enter drink name"
                  value={drinkName}
                  onChange={(e) => setDrinkName(e.target.value)}
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Price"
                rules={[{ required: true, message: "Please enter Price" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  addonAfter="VND"
                  placeholder="Please enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Item>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: "30px" }}>
            <Col span={12}>
              <Item
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    setImageFile(file);
                    return false;
                  }}
                >
                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile)}
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
