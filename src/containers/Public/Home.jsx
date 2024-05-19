import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import coffeecup from "../../../src/assets/coffeecup.png";
import background from "../../../src/assets/backgounrd.jpg";
import coffee_side_1 from "../../../src/assets/coffee_side_1.png";
import coffee_side_2 from "../../../src/assets/coffee_side_2.png";
import coffee_side_3 from "../../../src/assets/coffee_side_3.png";
import coffee_side_4 from "../../../src/assets/coffee_side_4.png";

function Home() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Header />
      <div className="flex items-center justify-center px-10">
        <div className="relative z-10 w-[700px] p-8 text-white flex flex-col items-start justify-center">
          <h2 className="text-6xl font-semibold text-black">
            A Special Morning Moment
          </h2>
          <p className="mt-4 text-xl text-left text-black">
            The coffee is brewed by first roasting the green coffee beans over
            hot coals in a brazier. given an opportunity to sample
          </p>
          <button className="mt-5 px-6 py-3 bg-black text-white rounded-md transition duration-300 hover:bg-transparent hover:border hover:text-black hover:border-black">
            Explore Now
          </button>
        </div>
        <img
          src={coffeecup}
          alt="Coffee Management Banner"
          className="w-2/3 max-w-lg"
        />
      </div>
      <div>
        <h3 className="text-black text-center text-[40px]">
          OUR DELICIOUS OFFER
        </h3>
        <ul className="flex justify-center gap-10 mt-10">
          <li className="flex flex-col items-center mr-8 transform transition-all duration-300 hover:translate-y-[-20px]">
            <img
              src={coffee_side_1}
              alt="Coffee Side 1"
              className="fixed-size-image w-auto object-contain"
            />
            <span className="text-lg mt-2 uppercase text-[25px] font-sans text-[#35374B]">
              Types of coffee
            </span>
            <span className="font-light mt-[15px] text-[18px] text-center text-[#E19898]">
              This is the standard in coffee. It is the most common and most
              popular style.
            </span>
          </li>
          <li className="flex flex-col items-center mr-8 transform transition-all duration-300 hover:translate-y-[-20px]">
            <img
              src={coffee_side_2}
              alt="Coffee Side 2"
              className="fixed-size-image w-auto object-contain"
            />
            <span className="text-lg mt-2 uppercase text-[25px] text-[#35374B]">
              Bean varieties
            </span>
            <span className="text-lg mt-[15px] text-[18px] text-center text-[#E19898]">
              The experimental design included a randomized complete block.
            </span>
          </li>
          <li className="flex flex-col items-center mr-8 transform transition-all duration-300 hover:translate-y-[-20px]">
            <img
              src={coffee_side_4}
              alt="Coffee Side 3"
              className="fixed-size-image w-auto object-contain"
            />
            <span className="text-lg mt-2 uppercase text-[25px] text-[#35374B]">
              Coffee & Pastry
            </span>
            <span className="text-lg mt-[15px] text-[18px] text-center text-[#E19898]">
              This is the standard in coffee. It is the most common and most
              popular style.
            </span>
          </li>
          <li className="flex flex-col items-center transform transition-all duration-300 hover:translate-y-[-20px]">
            <img
              src={coffee_side_3}
              alt="Coffee Side 4"
              className="fixed-size-image w-auto object-contain"
            />
            <span className="text-lg mt-2 uppercase text-[25px] text-[#35374B]">
              Coffee to Go
            </span>
            <span className="text-lg mt-[15px] text-[18px] text-center text-[#E19898]">
              The experimental design included a randomized complete block.
            </span>
          </li>
        </ul>
      </div>
      <div className="w-[400px] h-[500px] outline-1 mt-20">asd</div>
    </div>
  );
}

export default Home;
