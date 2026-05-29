import React, { useState } from "react";
import "./Searchbar.css";
const Searchbar = () => {
  const [active, setActive] = useState(1);
  const primeLocations = [
    "Baluwatar",
    "Bhaisepati",
    "Budhanilkantha",
    "Durbar Marg",
    "Hattisar",
    "Jawalakhel",
    "Jhamsikhel",
    "Kalanki",
    "Kamaladi",
    "Kirtipur",
    "Kupondole",
    "Lazimpat",
    "Lokanthali",
    "Madhyapur Thimi",
    "Maharajgunj",
    "Naxal",
    "New Road",
    "Patan Dhoka",
    "Pulchowk",
    "Putalisadak",
    "Sallaghari",
    "Sanepa",
    "Sitapaila",
    "Suryabinayak",
    "Thamel",
    "Tokha",
  ];
  return (
    <div className="searchbar w-full  bg-white  rounded-2xl px-5 py-3 flex flex-col gap-2 ">
      <div className="top flex flex-col md:flex-row md:justify-between md:items-center ">
        <div className="left  flex justify-between items-center  h-10 gap-3 font-bold bg-gray-100 rounded-full px-2 ">
          <button
            onClick={() => setActive(1)}
            className={active === 1 ? "bg-black text-white" : " text-gray-700"}
          >
            Buy
          </button>
          <button
            onClick={() => setActive(2)}
            className={active === 2 ? "bg-black text-white" : " text-gray-700"}
          >
            Rent
          </button>
          <button
            onClick={() => setActive(3)}
            className={active === 3 ? "bg-black text-white" : " text-gray-700"}
          >
            Sell
          </button>
        </div>
        {/* <div className="bg-blue-500  ">
          <i class="ri-star-line"></i>
          <p>4.5 Review()</p>
        </div> */}
        <div className="right"></div>
      </div>
      <div className="search flex flex-col md:flex-row items-center gap-3 pb-2">
        <div>
          <p>Location</p>
          <select name="" id="">
            <option value="a" selected disabled>
              Select Location
            </option>
            {primeLocations.map((location) => (
              <option value="">{location}</option>
            ))}
          </select>
        </div>
        <div>
          <p>Property Type</p>
          <select name="" id="">
            <option value="a" selected>
              Individual
            </option>
            {active === 1 && (
              <>
                <option value="">House</option>
                <option value="">Apartment</option>
                <option value="">Penthouse</option>
                <option value="">Land</option>
              </>
            )}
            {active === 2 && (
              <>
                <option value="">Office Space</option>
                <option value="">Duplex</option>
                <option value="">House</option>
                <option value="">Apartment</option>
                <option value="">Land</option>
              </>
            )}
            {active === 3 && (
              <>
                <option value="">Residential House</option>
                <option value="">Apartment</option>
                <option value="">Flat</option>
                <option value="">Commercial Property</option>
                <option value="">Retail Shop</option>
                <option value="">Land</option>
                <option value="">Penthouse</option>
              </>
            )}
          </select>
        </div>
        <div>
          <p>Price</p>
          <select name="" id="">
            <option value="a" selected>
              $10000 - $50000
            </option>
            <option value="">$50000 - $100000</option>
            <option value="">$100000 - $200000</option>
            <option value="">$200000 - $500000</option>
            <option value="">$500000 - $1000000</option>
          </select>
        </div>
        <div>
          <button className="bg-black text-white px-4 py-1.5 rounded-[50px]  mt-5">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
