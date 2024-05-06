import React, { useCallback } from "react";
import logo from "../../assets/logo.png";
import { Button } from "../../components";
import TextSpan from "../../components/TextSpan";
import icons from "../../ultils/icons";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
const { AiOutlinePlusCircle, IoIosLogIn, AiOutlineUserAdd } = icons;
function HeaderLayout() {
  const navigate = useNavigate();
  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
  }, []);
  const goHome = useCallback(() => {
    navigate(path.HOME);
  }, []);
  return (
    <div className="w-1600 flex items-center justify-between mr-12 ">
      <img
        src={logo}
        onClick={goHome}
        alt="logo"
        className="w-[240px] h-[70px] object-contain cursor-pointer"
      />
      <div className="flex items-center gap-1">
        <TextSpan
          IcAfter={AiOutlineUserAdd}
          text={"Đăng xuất"}
          onClick={goLogin}
        ></TextSpan>
      </div>
    </div>
  );
}

export default HeaderLayout;
