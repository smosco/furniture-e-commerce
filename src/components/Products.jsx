import React from "react";
import { getProducts } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

export default function Products() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], getProducts);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:gird-cols-4 gap-4 p-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}
