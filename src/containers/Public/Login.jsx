import React from "react";
import { InputForm, Button } from "../../components";
const Login = () => {
  return (
    <div className="bg-white w-[600px] p-[30px] pb-[100px]  rounded-sm shadow-sm">
      <h3 className="font-semibold text-3xl mb-3">Đăng nhập</h3>
      <div className="w-full flex flex-col gap-3">
        <InputForm label={"Số điện thoại"} />
        <InputForm label={"Mật khẩu"} />
        <Button
          text="Đăng nhập"
          bgColor="bg-secondary1"
          textColor="text-white"
          fullWidth
        />
      </div>
      <div className="mt-7 flex items-center justify-between">
        <small className="text-[blue] hover:text-[orange] cursor-pointer">
          Bạn quên mật khẩu?
        </small>
      </div>
    </div>
  );
};

export default Login;
