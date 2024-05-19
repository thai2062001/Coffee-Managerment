import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Upload,
  Image,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchDrinkData } from "../../../store/Slice/drinkSlice";
import { path } from "../../../ultils/constant";
import { callAPINoHead, callAPIPatchMulti } from "../../../ultils/axiosApi";
import {
  showFailureNotification,
  showSuccessNotification,
} from "../../../ultils/notificationUtils";
import { UploadOutlined } from "@ant-design/icons";

const EditDrink = ({ onEditData, drink_id }) => {
  const [form] = Form.useForm();
  const [imageFileUrl, setImageFile] = useState(null);
  const dispatch = useDispatch();

  const getDrinkById = (state, drinkId) => {
    return state.drink.drinkList.find((drink) => drink.drink_id === drinkId);
  };

  const drink = useSelector((state) => getDrinkById(state, drink_id));

  const [formData, setFormData] = useState({
    drink_name: drink ? drink.drink_name : "",
    price: drink ? drink.price : "",
    image_url: drink ? drink.image_url : "",
    imageFile: null, // Thêm trường để lưu trữ file ảnh
  });

  useEffect(() => {
    if (drink) {
      setFormData({
        drink_name: drink.drink_name,
        price: drink.price,
        image_url: drink.image_url,
      });
      form.setFieldsValue({
        drink_name: drink.drink_name,
        price: drink.price,
      });
    }
  }, [drink, form]);

  useEffect(() => {
    dispatch(fetchDrinkData());
  }, [dispatch]);

  const onClose = () => {
    onEditData(null);
  };

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleUploadChange = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData({
        ...formData,
        image_url: e.target.result,
        imageFile: file, // Lưu file ảnh vào state
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (formData.drink_name.trim() !== "" && formData.image_url) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("drink_name", formData.drink_name);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("image_url", formData.imageFile);
        const apiUrl = `${path.API_BASE_URL}${path.DRINK_API_URL}/${drink_id}`;
        const newData = await callAPIPatchMulti(apiUrl, formDataToSend);
        console.log(newData);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        dispatch(fetchDrinkData);
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

  const resetFormData = () => {
    setFormData({
      drink_name: "",
      price: "",
      image_url: "",
      imageFile: null,
    });
    form.resetFields();
  };

  return (
    <>
      <Drawer
        title="Edit Drink"
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="drink_name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter drink name",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter drink name"
                  value={formData.drink_name}
                  onChange={(e) => handleChange("drink_name", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: "Please enter drink price",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter drink price"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="image_url" label="Image">
                {formData.image_url && (
                  <Image
                    width={200}
                    height={150}
                    src={formData.image_url}
                    alt="Drink Image"
                    style={{ marginBottom: 10 }}
                  />
                )}
                <Upload
                  className="block"
                  name="image"
                  listType="picture"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    setImageFile(file);
                    return false;
                  }} // Ngăn tải lên tự động
                  onChange={handleUploadChange}
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EditDrink;
