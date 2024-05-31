import React from "react";
import { List, Button, Avatar } from "antd";
import { ShoppingCartOutlined, MinusCircleOutlined } from "@ant-design/icons";

const Cart = ({ cart, onCheckout, onRemove }) => {
  const getTotalPrice = () => {
    return Object.values(cart)
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  };

  return (
    <div className="flex flex-col h-full shadow-lg bg-white p-4">
      <h3 className="text-xl font-semibold mb-4">
        Drinks Order <ShoppingCartOutlined />
      </h3>
      <List
        itemLayout="horizontal"
        dataSource={Object.values(cart)}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="text"
                icon={<MinusCircleOutlined />}
                onClick={() => onRemove(item.drink_id)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.image_url} />}
              title={item.drink_name}
              description={`Quantity: ${item.quantity} - ${(
                item.price * item.quantity
              ).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}`}
            />
          </List.Item>
        )}
      />
      <div className="mt-auto">
        <div className="font-bold text-xl mb-2">Total: {getTotalPrice()}</div>
        <Button
          type="primary"
          className="bg-[#5BBCFF]"
          block
          onClick={onCheckout}
        >
          Order
        </Button>
      </div>
    </div>
  );
};

export default Cart;
