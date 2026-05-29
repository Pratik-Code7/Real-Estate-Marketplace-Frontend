import React from "react";

const Profile = () => {
  return (
    <div className="dash-right  overflow-y-auto h-full w-full flex flex-col   p-10  gap-5 ">
      <div className="dash-txt  ">
        <h1 className=" text-3xl font-bold py-2">Profile Settings</h1>
        <p>Manage your account information and preferences.</p>
      </div>
      <div className=" flex justify-between items-center gap-10 p-5">
        <div className=" flex justify-center items-center ">
          <div className="w-88 flex flex-col bg-white border border-gray-300 rounded-2xl  overflow-hidden shadow-lg">
            {/* Top Section */}
            <div className="flex flex-col justify-center items-center gap-3 py-6 bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?auto=format&fit=crop&w=1170&q=80"
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-2xl"
              />

              <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl font-semibold">Pratik Shakya</h1>
                <p className="text-gray-500 text-sm">xxx@gmail.com</p>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-3 border rounded-xl p-2">
                <i className="ri-time-line text-xl"></i>

                <div>
                  <h1 className="font-medium">Member Since</h1>
                  <p className="text-sm text-gray-500">May 12, 2023</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border rounded-xl p-2">
                <i className="ri-map-pin-line text-xl"></i>

                <div>
                  <h1 className="font-medium">Location</h1>
                  <p className="text-sm text-gray-500">Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border rounded-xl p-2">
                <i className="ri-phone-line text-xl"></i>

                <div>
                  <h1 className="font-medium">Phone</h1>
                  <p className="text-sm text-gray-500">+977 XXXXXXXX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right form */}
        <div className="bg-white w-full h-full rounded-xl p-8 border border-gray-300 shadow flex flex-col gap-5">
          <div className="dash-txt  ">
            <h1 className=" text-lg font-bold ">Profile Settings</h1>
            <p className="text-sm text-gray-700">
              Manage your account information and preferences.
            </p>
          </div>
          <div className="w-full">
            <form action="" className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="">Full Name</label>
                <input type="text" className="p-1 rounded-lg border-2" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="">Email</label>
                <input type="text" className="p-1 rounded-lg border-2" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="">Phone Number</label>
                <input type="text" className="p-1 rounded-lg border-2" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="">Location</label>
                <input type="text" className="p-1 rounded-lg border-2" />
              </div>
              <div className="flex flex-col gap-1 col-span-2 ">
                <label htmlFor="">Bio</label>
                <textarea
                  name=""
                  id=""
                  className="p-1 rounded-lg border-2 h-24 "
                ></textarea>
              </div>
              <div className="col-span-2 flex justify-end">
                <button className="bg-black text-white px-4 py-2 rounded-lg">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
