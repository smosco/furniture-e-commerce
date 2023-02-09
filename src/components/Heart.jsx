import React, { useState } from "react";
import { HiHeart } from "react-icons/hi";
import { useAuthContext } from "../contexts/AuthContext";
import { addOrUpdateWish, removeFromWish } from "../api/firebase";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export default function Heart({ product }) {
  const { user } = useAuthContext();
  const productId = product.id;
  const [heart, setHeart] = useState(true);

  //mutation사용하기 위해 useMutation함수 만듦
  const queryClient = useQueryClient();
  const addWish = useMutation(
    ({ uid, product }) => addOrUpdateWish(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["wish"]);
      },
    }
  );
  const removeWish = useMutation(
    ({ uid, productId }) => removeFromWish(uid, productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["wish"]);
      },
    }
  );

  if (user && user.uid) {
    const { uid } = user;

    const toggleHeart = () => {
      setHeart((prev) => !prev);
      // console.log(productId, heart);

      //mutate사용 직접 업데이트하지 않는다.
      if (heart) {
        addWish.mutate({ uid, product });
      } else {
        removeWish.mutate({ uid, productId });
      }
      //addOrUpdateWish(uid, product);
    };
    return (
      <div
        onClick={toggleHeart}
        className="absolute w-10 h-10 rounded-full bg-ore-brand bottom-6 right-6 //
       flex justify-center items-center"
      >
        <HiHeart
          className={`${heart ? "text-black" : "text-white"} text-2xl`}
        />
      </div>
    );
  }
  return (
    <div
      onClick={() => alert("로그인이 필요합니다.")}
      className="absolute w-10 h-10 rounded-full bg-ore-brand bottom-6 right-6 //
    flex justify-center items-center"
    >
      <HiHeart className="text-white text-2xl" />
    </div>
  );
  // const { uid } = user;
  // //mutation사용하기 위해 useMutation함수 만듦
  // const queryClient = useQueryClient();
  // const addWish = useMutation(
  //   ({ uid, product }) => addOrUpdateWish(uid, product),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["wish"]);
  //     },
  //   }
  // );

  // const handleClick = () => {
  //   //mutate사용 직접 업데이트하지 않는다.
  //   addWish.mutate({ uid, product });
  //   //addOrUpdateWish(uid, product);
  // };
  // return (
  //   <div
  //     onClick={handleClick}
  //     className="absolute w-10 h-10 rounded-full bg-ore-brand bottom-6 right-6 //
  //      flex justify-center items-center"
  //   >
  //     <HiHeart className="text-white text-2xl" />
  //   </div>
  // );
}
