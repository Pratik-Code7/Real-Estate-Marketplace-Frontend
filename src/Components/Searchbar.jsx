import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";

const Searchbar = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState(1);

  const [search, setSearch] = useState({
    location: "",
    propertyType: "",
    price: "",
  });

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

  const handleChange = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search.location) params.append("location", search.location);

    if (search.propertyType) params.append("propertyType", search.propertyType);

    if (search.price) params.append("price", search.price);

    navigate(`/listing?${params.toString()}`);
  };

  return (
    <div className="searchbar w-full bg-white rounded-2xl px-5 py-3 flex flex-col gap-2">
      {/* TOP */}
      <div className="top flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="left flex justify-between items-center h-10 gap-3 font-bold bg-gray-100 rounded-full px-2">
          <button
            onClick={() => setActive(1)}
            className={active === 1 ? "bg-black text-white" : "text-gray-700"}
          >
            Buy
          </button>

          <button
            onClick={() => setActive(2)}
            className={active === 2 ? "bg-black text-white" : "text-gray-700"}
          >
            Rent
          </button>

          <button
            onClick={() => setActive(3)}
            className={active === 3 ? "bg-black text-white" : "text-gray-700"}
          >
            Sell
          </button>
        </div>
      </div>

      {/* SEARCH */}

      <div className="search flex flex-col md:flex-row items-center gap-3 pb-2">
        {/* LOCATION */}

        <div>
          <p>Location</p>

          <select
            name="location"
            value={search.location}
            onChange={handleChange}
          >
            <option value="">Select Location</option>

            {primeLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* PROPERTY TYPE */}

        <div>
          <p>Property Type</p>

          <select
            name="propertyType"
            value={search.propertyType}
            onChange={handleChange}
          >
            <option value="">Select Property</option>

            {active === 1 && (
              <>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Land">Land</option>
              </>
            )}

            {active === 2 && (
              <>
                <option value="Office Space">Office Space</option>
                <option value="Duplex">Duplex</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Land">Land</option>
              </>
            )}

            {active === 3 && (
              <>
                <option value="Residential House">Residential House</option>

                <option value="Apartment">Apartment</option>

                <option value="Flat">Flat</option>

                <option value="Commercial Property">Commercial Property</option>

                <option value="Retail Shop">Retail Shop</option>

                <option value="Land">Land</option>

                <option value="Penthouse">Penthouse</option>
              </>
            )}
          </select>
        </div>

        {/* PRICE */}

        <div>
          <p>Price</p>

          <select name="price" value={search.price} onChange={handleChange}>
            <option value="">Any Price</option>
            <option value="50000">Rs 50,000</option>
            <option value="100000">Rs 100,000</option>
            <option value="200000">Rs 200,000</option>
            <option value="500000">Rs 500,000</option>
            <option value="1000000">Rs 1,000,000</option>
          </select>
        </div>

        {/* BUTTON */}

        <div>
          <button
            onClick={handleSearch}
            className="bg-black text-white px-5 py-2 rounded-full mt-5"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
