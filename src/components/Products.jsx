import React from "react";
import { getProducts } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

export default function Products({ selected, filter }) {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(
    ["products", selected, filter],
    () => getProducts(selected, filter),
    {
      staleTime: 100 * 60,
    }
  );

  const hasProducts = products && products.length > 0;
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!hasProducts && <p>상품이 없습니다.</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:gird-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}
