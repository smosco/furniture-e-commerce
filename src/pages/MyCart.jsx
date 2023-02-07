import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../contexts/AuthContext";
import CartCard from "../components/CartCard";
import PriceCard from "../components/PriceCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import Button from "../components/ui/Button";

const SHIPPING = 3;

export default function MyCart() {
  const {
    user: { uid },
  } = useAuthContext();

  const { isLoading, data: cartItems } = useQuery(["cart"], () => getCart(uid));
  const hasCartItems = cartItems && cartItems.length > 0;
  const totalPrice =
    cartItems &&
    cartItems.reduce(
      (prev, current) => prev + parseInt(current.price) * current.qty,
      0
    );

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <section className="p-8 flex flex-col">
        <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
          내 장바구니
        </p>
        {!hasCartItems && <p>장바구니에 상품이 없습니다.</p>}
        {hasCartItems && (
          <>
            <ul className="border-b border-gray-300 mb-8">
              {cartItems.map((cartItem) => (
                <CartCard key={cartItem.id} cartItem={cartItem} uid={uid} />
              ))}
            </ul>
            <div className="flex justify-between items-center mb-6 px-2 md:px-8 lg-px-16">
              <PriceCard text="상품총액" price={totalPrice} />
              <BsFillPlusCircleFill className="shrink-0" />
              <PriceCard text="배송액" price={SHIPPING} />
              <FaEquals className="shrink-0" />
              <PriceCard text="총가격" price={totalPrice + SHIPPING} />
            </div>
            <Button text="주문하기" />
          </>
        )}
      </section>
    </>
  );
}
