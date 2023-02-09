import React from "react";
import { useNavigate } from "react-router-dom";
import Heart from "./Heart";

export default function ProductCard({
  product,
  product: { id, title, image, price, category },
}) {
  //const { title, image, price, category } = product;
  const navigate = useNavigate();
  return (
    <div className="relative">
      <Heart product={product} />
      <li
        onClick={() => {
          navigate(`/product/${id}`, { state: { product } });
        }}
        className="rounded-3xl shadow-md overflow-hidden cursor-pointer"
      >
        <img className="w-full aspect-square" src={image} alt={title} />
        <div className="flex flex-col justify-between px-4 py-2 gap-2">
          <div className="text-lg flex flex-col justify-between">
            <p className="text-sm text-gray-400">{category}</p>
            <p className="extrabold text-ore-black truncate">{title}</p>
          </div>
          <p className="mb-4 text-2xl text-ore-black font-semibold">{`$${price}`}</p>
        </div>
      </li>
    </div>
  );
}
