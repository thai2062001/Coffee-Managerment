import React, { useCallback } from "react";
import logo from "../../assets/logo.png";
import { Button } from "../../components";
import TextSpan from "../../components/TextSpan";
import icons from "../../ultils/icons";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
const { AiOutlinePlusCircle, IoIosLogIn, AiOutlineUserAdd } = icons;
function Header() {
  const navigate = useNavigate();
  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
  }, []);
  const goHome = useCallback(() => {
    navigate(path.HOME);
  }, []);
  return (
    <div className="w-[100vw] flex items-center justify-around ">
      <img
        src={logo}
        onClick={goHome}
        alt="logo"
        className="w-[240px] h-[70px] object-contain cursor-pointer"
      />
      <div className="flex items-center gap-1">
        <ul className="flex items-center gap-10 justify-between mr-10 ">
          <li className="text-[#000000] text-[18px] cursor-pointer">
            <a href="#"></a>Home
          </li>
          <li className="text-[#000000] text-[18px] cursor-pointer">
            <a href="#"></a>Manager
          </li>
          <li className="text-[#000000] text-[18px] cursor-pointer">
            <a href="#"></a>Contact
          </li>
          <li
            onClick={goLogin}
            className="text-[#000000] text-[18px] cursor-pointer"
          >
            <a href="#"></a>Login
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
