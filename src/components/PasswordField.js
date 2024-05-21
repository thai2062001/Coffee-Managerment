import React, { useState } from "react";
import { Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const PasswordField = ({ password }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {visible ? password : "••••••••"}
      <Button
        type="text"
        icon={visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
        onClick={() => setVisible(!visible)}
      />
    </div>
  );
};

export default PasswordField;
