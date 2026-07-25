import React from "react";

const Property = () => {
  const dashStats = [
    { title: "TOTAL LIKES", value: 120 },
    { title: "INQUIRIES", value: 45 },
    { title: "APPLICATIONS", value: 18 },
    { title: "ACTIVE LISTINGS", value: 18 },
  ];

  const items = [
    {
      img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
      title: "Modern Apartment",
    },
    {
      img: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
      title: "Luxury Villa",
    },
    {
      img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      title: "City Penthouse",
    },
    {
      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      title: "Cozy Family House",
    },
    {
      img: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      title: "Minimal Studio",
    },
  ];

  return (
    <div className="w-full h-full p-4 md:p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">My Properties</h1>
        <p className="text-gray-500">
          Manage your active properties and track their performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {dashStats.map((elem, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow-md ">
            <h3 className="text-sm text-gray-500">{elem.title}</h3>
            <p className="text-xl font-bold">{elem.value}</p>
          </div>
        ))}
      </div>

      {/* Property List */}
      <div className="flex flex-col gap-5">
        {items.map((elem, idx) => (
          <div
            key={idx}
            className="w-full bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-xs "
          >
            {/* Image */}
            <div className="relative h-56 md:h-auto md:w-1/3">
              <img
                src={elem.img}
                alt={elem.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-xl text-xs">
                Active
              </div>
            </div>

            {/* Details */}
            <div className="w-full flex flex-col justify-between p-4 md:p-6">
              <div>
                {/* Title */}
                <div className="flex  md:flex-row justify-between gap-2">
                  <h2 className="text-lg font-bold">{elem.title}</h2>
                  <p className="font-semibold">$1000</p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                  <span>1 Bed</span>
                  <span>1 Bath</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <i className="ri-map-pin-2-fill"></i>
                  <span>Lorem ipsum dolor sit amet</span>
                </div>

                {/* Rating */}
                <div className="mt-2 text-sm">
                  <i className="ri-star-fill text-yellow-400"></i>
                  <span> Rating (4.5/5)</span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 border-t pt-4 flex  md:flex-row justify-between items-start md:items-center gap-3 text-sm">
                <span className="text-gray-500">Posted 2 days ago</span>

                <div className="flex gap-4">
                  <button className="hover:text-blue-600">
                    <i className="ri-pencil-line"></i> Edit
                  </button>
                  <button className="text-red-500 hover:text-red-600">
                    <i className="ri-delete-bin-line"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
