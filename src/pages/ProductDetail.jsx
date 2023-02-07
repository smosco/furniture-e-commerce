import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { addOrUpdateCart } from "../api/firebase";
import Button from "../components/ui/Button";
import { useAuthContext } from "../contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export default function ProductDetail() {
  const {
    state: {
      product,
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();

  const [selected, setSelected] = useState(options && options[0]);

  const { user } = useAuthContext();
  //const { user: {uid} } = useAuthContext();
  const userId = user.uid;

  const [success, setSuccess] = useState();

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  //mutaion 사용하기 위해 useMutation함수 만듦
  const queryClient = useQueryClient();
  const addCart = useMutation(
    ({ userId, product }) => addOrUpdateCart(userId, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cart"]);
      },
    }
  );

  const handleClick = () => {
    //장바구니에 추가
    const product = { id, image, title, price, option: selected, qty: 1 };
    // mutation 사용
    addCart.mutate(
      { userId, product },
      {
        onSuccess: () => {
          setSuccess("✅상품이 장바구니에 추가되었습니다.");
          setTimeout(() => {
            setSuccess(null);
          }, 4000);
        },
      }
    );
    // mutaion사용전 직접 업데이트한 코드
    // addOrUpdateCart(userId, product) //
    //   .then(() => {
    //     setSuccess("✅상품이 장바구니에 추가되었습니다.");
    //     setTimeout(() => {
    //       setSuccess(null);
    //     }, 4000);
    //   });
  };

  return (
    <>
      <p className="mx-12 mt-4 text-gray-700 ">{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img className="w-full px-4 basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">
            ${price}
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <label className="text-brand font-bold" htmlFor="select">
              옵션:
            </label>
            <select
              id="select"
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
              onChange={handleSelect}
              value={selected}
            >
              {options.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
          <Button text="장바구니에 추가" onClick={handleClick} />
          {success && <p className="text-center">{success}</p>}
        </div>
      </section>
    </>
  );
}
