import React from "react";
import { Tag } from "antd";

const createAntTag = (text, color) => {
  return <Tag color={color}>{text}</Tag>;
};

export { createAntTag };
