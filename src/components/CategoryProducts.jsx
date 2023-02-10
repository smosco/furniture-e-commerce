import React from "react";
import { getCategoryProducts, getProducts } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

export default function CategoryProducts({ selected, filter }) {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(
    ["products", selected, filter],
    () => getCategoryProducts(selected, filter),
    {
      staleTime: 100 * 60,
    }
  );

  const hasProducts = products && products.length > 0;

  //realtime써서 query사용하지 않을때
  // const categoryProducts = products.filter(
  //   (product) => product.category === category
  // );

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* {filter ? console.log(filter) : console.log("nothing")} */}

      <ul className="grid grid-cols-1 md:grid-cols-3 lg:gird-cols-4 gap-6 p-6">
        {hasProducts &&
          products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        {!hasProducts && <p>상품이 없습니다.</p>}
      </ul>
    </>
  );
}
