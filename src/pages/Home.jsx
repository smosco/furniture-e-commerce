import React from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";
import Slider from "../components/Slider";

export default function Home() {
  return (
    <>
      <Slider />
      <Banner />
      <Products />
    </>
  );
}
