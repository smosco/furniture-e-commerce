import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { removeFromWish } from "../api/firebase";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const ICON_CLASS =
  "text-white text-2xl text-bold transition-all cursor-pointer hover:scale-110";

export default function WishCard({
  uid,
  wishItem,
  wishItem: { id, title, image, price, category },
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
  const navigate = useNavigate();

  return (
    // <div className="text-2xl flex items-cetner absolute">
    //   <RiDeleteBinFill className={ICON_CLASS} onClick={handleDelete} />
    // </div>
    // {/* <Heart product={product} /> */}
    <div className="relative">
      <div
        className="text-2xl flex items-center justify-center absolute top-2 right-2 //
      w-10 h-10 bg-ore-brand rounded-full"
      >
        <AiOutlineClose className={ICON_CLASS} onClick={handleDelete} />
      </div>
      <li
        onClick={() => {
          navigate(`/product/${id}`, { state: { product: wishItem } });
        }}
        className="rounded-3xl shadow-md overflow-hidden cursor-pointer"
      >
        <img className="w-full aspect-square" src={image} alt={title} />
        <div className="flex flex-col justify-between px-4 py-2 gap-2">
          <div className="text-lg flex flex-col justify-between">
            <p className="text-sm text-gray-400">{category}</p>
            <p className="extrabold text-ore-black truncate">{title}</p>
          </div>
          <p className="mb-4 text-2xl text-ore-black font-semibold">{`$${price}`}</p>
        </div>
      </li>
    </div>

    // <li className="flex justify-between my-2 items-center gap-4">
    //   <img className="w-24 md:w-48 rounded-lg" src={image} alt={title} />
    //   <div className="flex-1 flex justify-between">
    //     <div className="basis-3/5">
    //       <p className="text-lg">{title}</p>
    //       <p>${price}</p>
    //     </div>
    //     <div className="text-2xl flex items-cetner">
    //       <RiDeleteBinFill className={ICON_CLASS} onClick={handleDelete} />
    //     </div>
    //   </div>
    // </li>
  );
}
