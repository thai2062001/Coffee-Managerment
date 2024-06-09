import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo_new from "../../assets/logo_new.jpg";
import TextSpan from "../../components/TextSpan";
import { Button } from "antd";
import icons from "../../ultils/icons";
import { path } from "../../ultils/constant";

const { AiOutlineUserAdd } = icons;

function HeaderLayout() {
  const navigate = useNavigate();

  const LogOut = useCallback(() => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }, [navigate]);

  const goHome = useCallback(() => {
    navigate(path.HOME);
  }, [navigate]);

  return (
    <div className="w-full bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        <img
          src={logo_new}
          onClick={goHome}
          alt="logo"
          className="w-[240px] h-[70px] object-contain cursor-pointer"
        />
        <div className="flex items-center gap-4">
          <Button
            className="bg-[#5d9ecc]"
            type="primary"
            icon={<AiOutlineUserAdd />}
            onClick={LogOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeaderLayout;
