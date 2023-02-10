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
    <div className="slider h-[calc(100vh - 80px)] relative overflow-hidden">
      <div
        className="container w-[300vw] h-full flex transition-all"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <div className="w-full h-full">
          <img className="object-cover" src={data[0]} alt="" />
        </div>
        <div className="w-full h-full">
          <img className="w-full h-full object-cover" src={data[1]} alt="" />
        </div>
        <div className="w-full h-full">
          <img className="w-full h-full object-cover" src={data[2]} alt="" />
        </div>
      </div>
      <div className="icons flex absolute left-2 right-2 bottom-24 gap-4">
        <div
          className="icon w-12 h-12 flex justify-center items-center cursor-pointer bg-[#f0f0f0] rounded-lg"
          onClick={prevSlide}
        >
          <SlArrowLeft className="text-gray-600 font-bold text-3xl" />
        </div>
        <div
          className="icon w-12 h-12 flex justify-center items-center cursor-pointer bg-[#f0f0f0] rounded-lg"
          onClick={nextSlide}
        >
          <SlArrowRight className="text-gray-600 font-bold text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
