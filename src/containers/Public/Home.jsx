import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
function Home() {
  return (
    <div className="flex flex-col items-center bg-center ">
      <Header />
      <div className="w-full flex flex-col justify-start items-center mt-3">
        <Outlet />
        <div className=""></div>
      </div>
    </div>
  );
}

export default Home;
