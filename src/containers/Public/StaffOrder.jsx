import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Card, InputNumber, Image } from "antd";
import HeaderLayout from "./HeaderLayout";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { fetchDrinkData } from "../../store/Slice/drinkSlice";
import axios from "axios";
import {
  showFailureNotification,
  showSuccessNotification,
} from "../../ultils/notificationUtils";

const { Content } = Layout;

const StaffOrder = () => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const drinkList = useSelector((state) => state.drink.drinkList);

  useEffect(() => {
    dispatch(fetchDrinkData());
  }, [dispatch]);

  const handleAddToCart = (drink, quantity) => {
    const itemIndex = cart.findIndex(
      (item) =>
        item.drink_id === drink.drink_id && item.drink_name === drink.drink_name
    );

    const updatedCart = [...cart];

    if (quantity > 0) {
      if (itemIndex !== -1) {
        updatedCart[itemIndex].quantity = quantity;
      } else {
        updatedCart.push({
          ...drink,
          quantity: quantity,
        });
      }
    } else {
      if (itemIndex !== -1) {
        updatedCart.splice(itemIndex, 1);
      }
    }

    setCart(updatedCart);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [drink.drink_id]: quantity,
    }));
  };

  const handleRemoveFromCart = (drink_id) => {
    const updatedCart = cart.filter((item) => item.drink_id !== drink_id);
    setCart(updatedCart);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [drink_id]: 0,
    }));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      showFailureNotification(
        "Error",
        "Your cart is empty. Please add some drinks to the cart before checking out."
      );
      return;
    }

    console.log("Processing checkout:", cart);
    const access_Token = localStorage.getItem("accessToken");
    const url = "http://localhost:5000/bill";
    const data = {
      bill_details: cart.map((item) => ({
        drink_name: item.drink_name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${access_Token}`,
          "Content-Type": "application/json",
        },
      });
      showSuccessNotification("Success", "Order successfully completed!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      console.log("Response:", response);
    } catch (error) {
      showFailureNotification(
        "Error",
        "There was an error processing your order. Please try again."
      );
      console.error("Checkout error:", error);
    }
  };

  return (
    <Layout>
      <HeaderLayout />
      <Content className="p-5 flex">
        <div className="flex-grow">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>Application</Breadcrumb.Item>
          </Breadcrumb>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {drinkList.map((drink) => (
              <Card
                key={drink.id}
                className="shadow-lg rounded-lg w-72 h-[350px]"
                cover={
                  <Image
                    alt={drink.drink_name}
                    src={drink.image_url}
                    className="object-cover w-full rounded-t-lg"
                    style={{ height: "200px" }}
                  />
                }
              >
                <Card.Meta
                  title={
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        {drink.drink_name}
                      </span>
                      <span className="text-gray-500 text-lg">
                        {drink.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>
                  }
                />
                <InputNumber
                  min={0}
                  className="mt-3 w-[80px]"
                  value={quantities[drink.drink_id] || 0}
                  onChange={(value) => handleAddToCart(drink, value)}
                />
              </Card>
            ))}
          </div>
        </div>
        <div className="w-80 ml-5">
          <Cart
            cart={cart}
            onCheckout={handleCheckout}
            onRemove={handleRemoveFromCart}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default StaffOrder;
