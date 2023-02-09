import React from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { removeFromWish } from "../api/firebase";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const ICON_CLASS =
  "transition-all cursor-pointer hover:text-brand hover:scale-105";

export default function WishCard({
  uid,
  wishItem,
  wishItem: { id, title, price, image },
}) {
  //mutation사용하기 위해 mutation함수 만듦
  const queryClient = useQueryClient();
  const removeWish = useMutation(({ uid, id }) => removeFromWish(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["wish"]);
    },
  });

  const handleDelete = () => {
    //mutation사용
    removeWish.mutate({ uid, id });
    //mutation 사용전 직접 삭제 코드
    //removeFromCart(uid, id);
  };

  return (
    <li className="flex justify-between my-2 items-center gap-4">
      <img className="w-24 md:w-48 rounded-lg" src={image} alt={title} />
      <div className="flex-1 flex justify-between">
        <div className="basis-3/5">
          <p className="text-lg">{title}</p>
          <p>${price}</p>
        </div>
        <div className="text-2xl flex items-cetner">
          <RiDeleteBinFill className={ICON_CLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
