import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getWish } from "../api/firebase";
import { useAuthContext } from "../contexts/AuthContext";

export default function WishStatus() {
  const {
    user: { uid },
  } = useAuthContext();

  //코드의 개선이 필요함
  const { data: wishItems } = useQuery(["wish"], () => getWish(uid));
  return (
    <div className="relative">
      <AiOutlineHeart className="text-4xl" />
      {wishItems && (
        <p
          className="w-6 h-6 text-center bg-ore-brand text-white font-bold//
         rounded-full absolute -top-2 -right-2"
        >
          {wishItems.length}
        </p>
      )}
    </div>
  );
}
