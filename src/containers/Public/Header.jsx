import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/logo.png";
import logo_new from "../../assets/logo_new.jpg";
import icons from "../../ultils/icons";
import { path } from "../../ultils/constant";
import { LogoutOutlined } from "@ant-design/icons"; // Import the Logout icon from Ant Design Icons

const { AiOutlinePlusCircle, IoIosLogIn, AiOutlineUserAdd } = icons;

const decodeTokenName = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.user_name;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  return null;
};

function Header() {
  const navigate = useNavigate();
  const [user_name, setUsername] = useState(null);

  useEffect(() => {
    const user_name = decodeTokenName();
    setUsername(user_name);
  }, []);

  const goLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const goHome = useCallback(() => {
    navigate(path.HOME);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUsername(null);
    navigate("/"); // Redirect to login after logout
  };

  return (
    <div className="w-full bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="w-[200px]">
          <img
            src={logo_new}
            onClick={goHome}
            alt="logo"
            className="h-[80px] cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8 text-[#7e7e7e] font-light text-[18px] uppercase">
            <li className="hover:text-[#322C2B] cursor-pointer">
              <a href="#">Home</a>
            </li>
            <li className="hover:text-[#322C2B] cursor-pointer">
              <a href="#">Manager</a>
            </li>
            <li className="hover:text-[#322C2B] cursor-pointer">
              <a href="#">About Us</a>
            </li>
            <li className="hover:text-[#322C2B] cursor-pointer">
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        {user_name ? (
          <div className="flex items-center gap-4">
            <span className="text-lg">{user_name}</span>
            <LogoutOutlined
              className="text-lg cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        ) : (
          <span onClick={goLogin}>
            <AiOutlineUserAdd className="w-10 h-6 cursor-pointer" />
          </span>
        )}
      </div>
    </div>
  );
}

export default Header;
