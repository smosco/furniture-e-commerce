import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";
import banner4 from "../images/banner4.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//import "./styles.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

export default function App() {
  return (
    <div className="w-auto h-screen">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Keyboard]}
        className="w-full h-full"
      >
        <SwiperSlide className="text-center text-lg flex justify-center items-center relative">
          <img src={banner1} className="w-full h-full" alt="" />
          <p className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-extrabold">
            ORE & FURNI 는 친환경적이고 정직한 소재를 사용합니다.
          </p>
        </SwiperSlide>
        <SwiperSlide className="text-center text-lg flex justify-center items-center">
          <img src={banner2} className="w-full h-full" alt="" />
        </SwiperSlide>
        <SwiperSlide className="text-center text-lg flex justify-center items-center">
          <img src={banner3} className="w-full h-full" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
