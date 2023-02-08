import React, { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [banner1, banner2, banner3];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };

  return (
    <div className="slider w-s h-[calc(100vh - 80px)] relative overflow-hidden">
      <div
        className="container w-[300vw] h-full flex transition-all"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <img className="w-screen h-full object-cover" src={data[0]} alt="" />
        <img className="w-screen h-full object-cover" src={data[1]} alt="" />
        <img className="w-screen h-full object-cover" src={data[2]} alt="" />
      </div>
      <div className="icons flex absolute left-0 right-0 bottom-24 gap-4">
        <div
          className="icon w-12 h-12 border-b flex justify-center items-center cursor-pointer"
          onClick={prevSlide}
        >
          <SlArrowLeft className="text-gray-100 font-bold text-3xl" />
        </div>
        <div
          className="icon w-12 h-12 border-b flex justify-center items-center cursor-pointer"
          onClick={nextSlide}
        >
          <SlArrowRight className="text-gray-100 font-bold text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
