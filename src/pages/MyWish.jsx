import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getWish } from "../api/firebase";
import { useAuthContext } from "../contexts/AuthContext";
import WishCard from "../components/WishCard";

export default function MyWish() {
  const {
    user: { uid },
  } = useAuthContext();

  const { isLoading, data: wishItems } = useQuery(["wish"], () => getWish(uid));
  const hasWishItems = wishItems && wishItems.length > 0;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <section className="p-8 flex flex-col">
        <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
          위시리스트
        </p>
        {!hasWishItems && <p>찜한 상품이 없습니다.</p>}
        {hasWishItems && (
          <>
            <ul className="border-b border-gray-300 mb-8">
              {wishItems.map((wishItem) => (
                <WishCard key={wishItem.id} wishItem={wishItem} uid={uid} />
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
