import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../contexts/AuthContext";

export default function CartStatus() {
  const {
    user: { uid },
  } = useAuthContext();

  //코드의 개선이 필요함
  const { data: cartItems } = useQuery(["cart"], () => getCart(uid));
  return (
    <div className="relative">
      <AiOutlineShoppingCart className="text-4xl" />
      {cartItems && (
        <p
          className="w-6 h-6 text-center bg-brand text-white font-bold//
         rounded-full absolute -top-2 -right-2"
        >
          {cartItems.length}
        </p>
      )}
    </div>
  );
}
