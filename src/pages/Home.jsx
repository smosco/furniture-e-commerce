import React from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";
import Slider from "../components/Slider";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Slider />
      {/* <Banner /> */}
      <section className="px-6">
        <Products />
      </section>
    </div>
  );
}
