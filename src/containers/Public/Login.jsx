import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { loginUser } from "./../../store/Slice/UserSlice";
import banner from "../../../src/assets/banner.jpg";
import coffee from "../../../src/assets/coffee.jpg";
import Header from "./Header";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Attempting to log in with:", values);
    try {
      const resultAction = await dispatch(
        loginUser({
          phone_number: values.phone_number,
          password: values.password,
        })
      );

      const result = unwrapResult(resultAction);
      console.log("Login successful, received result:", result);

      const accessToken = result.accessToken;

      if (typeof accessToken === "string") {
        localStorage.setItem("accessToken", accessToken);

        const decodedToken = jwtDecode(accessToken);
        const roleId = decodedToken.role_id;

        if (roleId === 1) {
          console.log("1");
          navigate("/admin/table/storage");
        } else {
          console.log("2");
          navigate("/staff/table/bill");
        }
      } else {
        console.error("Invalid access token");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="min-h-screen bg-[#F6F5F2] flex flex-col">
      <Header />
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white w-[1000px] h-[600px] mt-20 rounded-md shadow-lg flex">
          <div className="w-1/2 h-full">
            <img
              src={coffee}
              alt="Banner"
              className="w-full h-full object-cover rounded-l-md"
            />
          </div>
          <div className="w-1/2 p-[50px] flex flex-col justify-center">
            <h3 className="font-semibold text-center text-4xl mb-12">Login</h3>
            <div className="w-full flex flex-col gap-6 justify-center">
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="max-w-[400px] w-full mx-auto"
              >
                <Form.Item
                  label="Phone Number"
                  name="phone_number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password size="large" />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    className="bg-[#5BBCFF] mb-5"
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
