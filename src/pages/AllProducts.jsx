import React, { useState } from "react";
import Products from "../components/Products";
//import CategoryProducts from "../components/CategoryProducts";
import Slider from "@mui/material/Slider";

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
        <div className="category">
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
        </div>
        <div className="flex flex-col pt-8 px-6 gap-6 md:flex-row">
          <section className="filter w-full md:basis-1/4 md:block">
            <p>FILTER BY:</p>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={filter}
              onChange={handleChange}
              valueLabelDisplay="on"
              getAriaValueText={valuetext}
              min={50}
              max={1300}
            />
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
