import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  product: { id, title, image, price, category },
}) {
  //const { title, image, price, category } = product;
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/product/${id}`, { state: { product } });
      }}
      className="rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      <img className="w-full" src={image} alt={title} />
      <div className="mt-2 px-2 text-lg flex flex-col justify-between items-">
        <h3 className="truncate">{title}</h3>
        <p className="text-sm text-gray-600">{category}</p>
      </div>
      <p className="my-2 px-2 text-lg">{`$${price}`}</p>
    </li>
  );
}
