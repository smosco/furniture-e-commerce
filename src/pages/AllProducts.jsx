import React, { useState } from "react";
import Products from "../components/Products";
//import CategoryProducts from "../components/CategoryProducts";
import Slider from "@mui/material/Slider";
import Banner from "../components/Banner";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

export default function AllProducts() {
  const categories = [
    "모든제품",
    "의자",
    "침대",
    "데스크",
    "램프",
    "서랍장",
    "장식장",
  ];
  const [selected, setSelected] = useState();
  const [filter, setFilter] = useState([0, 1500]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setFilter([Math.min(newValue[0], filter[1] - minDistance), filter[1]]);
    } else {
      setFilter([filter[0], Math.max(newValue[1], filter[0] + minDistance)]);
    }
  };

  return (
    <>
      <div className="main">
        {/* <div className="category">
          <div className="border-b border-gray-300 text-3xl px-6 py-8 font-light">
            <p>{selected ? selected : "모든제품"}</p>
          </div>
          <div className="mx-auto border-b border-gray-300">
            <ul className="flex gap-4 overflow-x-auto py-4 px-6 ">
              {categories.map((category) => (
                <li
                  onClick={() => {
                    if (category === "모든제품") {
                      setSelected(null);
                    } else {
                      setSelected(category);
                    }
                  }}
                  key={category}
                  className="rounded-2xl bg-gray-200 py-2 px-6 cursor-pointer shrink-0"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div> */}
        <Banner />
        <div className="filter flex flex-col pt-8 px-6 gap-8 md:flex-row">
          <section className="side flex flex-col gap-8 w-full md:basis-1/4 md:block">
            <div className="category">
              <div className="text-3xl pb-8">
                <p>Categories</p>
              </div>
              <div className="mx-auto pb-6 border-b border-gray-300">
                <ul className="flex flex-col gap-4 overflow-x-auto">
                  {categories.map((category) => (
                    <li
                      onClick={() => {
                        if (category === "모든제품") {
                          setSelected(null);
                        } else {
                          setSelected(category);
                        }
                      }}
                      key={category}
                      className="rounded-2xl bg-gray-200 py-2 px-6 cursor-pointer shrink-0//
                     text-semibold hover:bg-ore-brand hover:text-white transition-all"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="filter pt-8">
              <p className="text-3xl pb-6">Filter By:</p>
              <p className="text-xl pb-4">PRICE</p>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={filter}
                onChange={handleChange}
                //valueLabelDisplay="on"
                getAriaValueText={valuetext}
                min={50}
                max={1300}
              />
              <div className="flex justify-between items-center">
                <p>$ {filter[0]}</p>
                <p>$ {filter[1]}</p>
              </div>
            </div>
          </section>
          <section className="products w-full md:basis-3/4">
            {!selected ? (
              <Products filter={filter} />
            ) : (
              <Products selected={selected} filter={filter} />
            )}
          </section>
        </div>
      </div>
    </>
  );
}
