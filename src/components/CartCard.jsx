import React from "react";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";
import { addOrUpdateCart, removeFromCart } from "../api/firebase";

const ICON_CLASS =
  "transition-all cursor-pointer hover:text-brand hover:scale-105";

export default function CartCard({
  uid,
  cartItem,
  cartItem: { id, title, price, image, qty, option },
}) {
  const handlePlus = () => {
    addOrUpdateCart(uid, { ...cartItem, qty: qty + 1 });
  };

  const handleMinus = () => {
    if (qty < 2) return;
    addOrUpdateCart(uid, { ...cartItem, qty: qty - 1 });
  };

  const handleDelete = () => {
    removeFromCart(uid, id);
  };

  return (
    <li className="flex justify-between my-2 items-center gap-4">
      <img className="w-24 md:w-48 rounded-lg" src={image} alt={title} />
      <div className="flex-1 flex justify-between">
        <div className="basis-3/5">
          <p className="text-lg">{title}</p>
          <p className="text-xl font-bold text-brand">{option}</p>
          <p>${price}</p>
        </div>
        <div className="text-2xl flex items-cetner">
          <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
          <span>{qty}</span>
          <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
          <RiDeleteBinFill className={ICON_CLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
