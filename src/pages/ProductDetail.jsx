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
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();

  const [selected, setSelected] = useState(options && options[0]);
  const [success, setSuccess] = useState();
  const { user } = useAuthContext();

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

  if (user && user.uid) {
    const userId = user.uid;
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
      <div className="">
        <div className="mx-8 md:mx-10">
          <p className="my-4 text-gray-500">{category}</p>
          <section className="flex flex-col md:flex-row md:justify-between md:mx-auto gap-8">
            <div className="rounded-xl basis-7/12 overflow-hidden ">
              <img className="w-full aspect-square" src={image} alt={title} />
            </div>
            <div className="w-full basis-5/12 flex flex-col md:px-8 mt-4 md:mt-0">
              <p className="text-2xl py-2 mb-2">{title}</p>
              <p className="text-xl font-bold pb-10 border-b border-gray-300">
                ${price}
              </p>
              <div className="flex flex-col py-8 gap-6 border-b border-gray-300">
                <div>
                  <label htmlFor="select">옵션 :</label>
                  <select
                    id="select"
                    className="p-2 ml-2 border-2 outline-none"
                    onChange={handleSelect}
                    value={selected}
                  >
                    {options.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Button
                    text="장바구니에 추가"
                    onClick={handleClick}
                    className="w-full py-4 md:w-auto md:px-10"
                  />
                </div>
              </div>
              <p className="py-4 text-lg ">{description}</p>
              {success && <p className="text-center">{success}</p>}
            </div>
          </section>
        </div>
      </div>
    );
  } else {
    const handleClick = () => {
      alert("로그인이 필요합니다");
    };
    return (
      <div className="">
        <div className="mx-8 md:mx-10">
          <p className="my-4 text-gray-500">{category}</p>
          <section className="flex flex-col md:flex-row md:justify-between md:mx-auto">
            <div className="rounded-xl overflow-hidden ">
              <img
                className="w-full basis-7/12 aspect-square"
                src={image}
                alt={title}
              />
            </div>
            <div className="w-full basis-5/12 flex flex-col md:px-8 mt-4 md:mt-0">
              <p className="text-2xl py-2 mb-2">{title}</p>
              <p className="text-xl font-bold pb-10 border-b border-gray-300">
                ${price}
              </p>
              <div className="flex flex-col py-8 gap-6 border-b border-gray-300">
                <div>
                  <label htmlFor="select">옵션 :</label>
                  <select
                    id="select"
                    className="p-2 ml-2 border-2 outline-none"
                    onChange={handleSelect}
                    value={selected}
                  >
                    {options.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <Button
                    text="장바구니에 추가"
                    onClick={handleClick}
                    className="w-full py-4 md:w-auto md:px-10"
                  />
                </div>
              </div>
              <p className="py-4 text-lg ">{description}</p>
              {success && <p className="text-center">{success}</p>}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
