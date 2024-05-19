import React, { useState, useEffect } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Select, Drawer, Col, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchDrinkData } from "./../../../store/Slice/drinkSlice";
import axios from "axios";
const { Option } = Select;

const AddBillForm = ({ onAddData }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const drinkList = useSelector((state) => state.drink.drinkList);
  const access_Token = localStorage.getItem("access-token");
  const showDrawer = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchDrinkData());
  }, [dispatch]);

  const onClose = () => {
    setOpen(false);
  };

  const handleAdd = async (value) => {
    console.log("Received values of form:", value);
    // onAddData(value);
    const url = "http://localhost:5000/bill";
    const data = value;

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_Token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Response:", response);
    setOpen(false);
    form.resetFields(); // Optionally reset form fields
  };

  return (
    <>
      <Button
        className="bg-[#5BBCFF] mb-5"
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        New Bill
      </Button>
      <Drawer
        title="Create a new Bill"
        width={720}
        onClose={onClose}
        visible={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          onFinish={handleAdd}
          layout="vertical"
          hideRequiredMark
          autoComplete="off"
        >
          <Form.List name="bill_details">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "drink_name"]}
                      rules={[
                        { required: true, message: "Please select a drink" },
                      ]}
                    >
                      <Select placeholder="Select a drink">
                        {drinkList.map((drink) => (
                          <Option key={drink.id} value={drink.drink_name}>
                            {drink.drink_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter a quantity",
                        },
                      ]}
                    >
                      <Input placeholder="quantity" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Bill Detail
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                className="bg-[#5BBCFF] mb-5"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddBillForm;
