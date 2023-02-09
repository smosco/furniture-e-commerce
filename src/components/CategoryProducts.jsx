import React from "react";
import { getProducts } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

export default function CategoryProducts({ category }) {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], getProducts, { staleTime: 100 * 60 });

  const CategoryProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* {filter ? console.log(filter) : console.log("nothing")} */}

      <ul className="grid grid-cols-1 md:grid-cols-3 lg:gird-cols-4 gap-6 p-6">
        {CategoryProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}
