import React, { useState } from "react";
import Products from "../components/Products";
import CategoryProducts from "../components/CategoryProducts";

export default function AllProducts() {
  const categories = ["모든제품", "의자", "침대", "데스크", "램프", "서랍장"];
  const [category, setCategory] = useState();

  return (
    <>
      <div className="border-b border-gray-300 text-3xl px-6 py-8 font-light">
        <p>{category ? category : "모든제품"}</p>
      </div>
      <div className="mx-auto border-b border-gray-300">
        <ul className="flex gap-4 overflow-x-auto py-4 px-6 ">
          {categories.map((category) => (
            <li
              onClick={() => {
                setCategory(category);
              }}
              key={category}
              className="rounded-2xl bg-gray-200 py-2 px-6 cursor-pointer shrink-0"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {category === "모든제품" || !category ? (
        <Products />
      ) : (
        <CategoryProducts category={category} />
      )}
    </>
  );
}
