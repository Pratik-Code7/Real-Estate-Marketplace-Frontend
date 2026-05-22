import { useState } from "react";
import Navbar from "../Components/Navbar";
import hero from "../assets/hero.png";
const DashBoard = () => {
  const [active, setactive] = useState(0);
  const dashList = [
    "My Properties",
    "Favorites",
    "Messages",
    "Profile Settings",
  ];
  const dashStats = [
    { title: "TOTAL LIKES", value: 120 },
    { title: "INQUIRIES", value: 45 },
    { title: "APPLICATIONS", value: 18 },
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
    <div className="h-screen  w-full bg-gray-200">
      <Navbar />
      <div className="Dash-Box flex  items-center h-full justify-center ">
        <div className=" bg-white h-full w-1/4  flex flex-col gap-2 p-5 ">
          {dashList.map((elem, idx) => (
            <div
              key={idx}
              onClick={() => {
                setactive(idx);
              }}
              className={
                active == idx
                  ? "bg-black text-white p-3 rounded  cursor-pointer"
                  : "p-3 rounded  cursor-pointer"
              }
            >
              {elem}
            </div>
          ))}
        </div>
        <div className="dash-right  overflow-y-auto h-full w-full flex flex-col  p-10  gap-10 ">
          <div>
            <div className="dash-txt  ">
              <h1 className=" text-3xl font-bold py-2">My Properties</h1>
              <p>Manage your active properties and track their performance.</p>
            </div>
            <div className="views flex justify-between pt-10 text-sm  ">
              {dashStats.map((elem, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="h-16 w-82 flex flex-col justify-center  py-2 px-5 bg-white rounded-xl border-gray-500 border-2  ">
                    <h1 className="font-bold">{elem.title}</h1>
                    <p>{elem.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="property-items gap-5 flex flex-col">
            {items.map((elem, idx) => (
              <div className="h-64 w-full bg-white rounded-2xl overflow-hidden flex ">
                <div className="img h-full w-1/3 relative">
                  <img
                    src={elem.img}
                    alt=""
                    className="h-full  object-cover absolute z-0 "
                  />
                  <div className="status absolute z-10 bg-white px-2 py-0.5  rounded-xl mx-3 mt-3">
                    Active
                  </div>
                </div>
                <div className="details w-full bg-white flex flex-col px-8 justify-between">
                  <div className=" py-5 ">
                    <div className="dash-title flex justify-between w-full py-1 text-xl">
                      <h1>
                        <b>{elem.title}</b>
                      </h1>
                      <p className="px-5">$1000</p>
                    </div>
                    <div className="detail-icons flex  gap-5 ">
                      <div className="text-sm ">1 Bed</div>
                      <div className="text-sm ">1 Bed</div>
                    </div>
                    <div className="dash-location flex items-center gap-1 py-2 ">
                      <i className="ri-map-pin-2-fill"></i>
                      <p className=" text-sm">Lorem ipsum dolor sit amet</p>
                    </div>
                    <div className="dash-review text-sm">
                      <i className="ri-star-fill text-yellow-300"></i> Rating(
                      4.5/5)
                    </div>
                  </div>
                  <div className="w-full  h-[28%] flex flex-col gap-5">
                    <div className="h-0.5 bg-gray-400"></div>
                    <div className="posted text-sm  flex items-center w-full  h-[25%] justify-between">
                      <div>Posted 2 days ago</div>
                      <div className="btns flex gap-10  px-4">
                        <button>
                          <i className="ri-pencil-line"></i> Edit
                        </button>
                        <button className="text-red-500">
                          <i className="ri-delete-bin-line"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
