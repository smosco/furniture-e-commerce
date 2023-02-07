import React from "react";

export default function Banner() {
  return (
    <section className="h-96 bg-yellow-900 relative">
      <div className="w-full h-full bg-cover bg-banner opacity-90"></div>
      <div className="absolute w-full top-32 text-center text-white drop-shadow-2xl">
        <h2 className="text-6xl font-semibold">Furniture for every need</h2>
      </div>
    </section>
  );
}
