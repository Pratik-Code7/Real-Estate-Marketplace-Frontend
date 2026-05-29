import React from "react";

const Messages = () => {
  return (
    <div className="dash-right overflow-y-auto h-screen  w-full flex flex-col p-10 gap-5  ">
      <h1 className="text-2xl font-bold ">Notifications</h1>
      {/* msg box */}
      <div className="msg w-full bg-white shadow h-24 flex items-center  px-6 shrink-0 rounded-xl gap-5">
        <div className="nCircle h-14 w-14 bg-gray-200 rounded-full shrink-0 flex justify-center items-center text-2xl">
          <i className="ri-notification-2-line"></i>
        </div>
        <div className="N-info">
          <h1 className="text-l font-semibold">Viewed by 2 people</h1>
          <p className="text-sm">Lorem ipsum dolor sit amet</p>
        </div>
        <div className="N-time text-xs text-gray-700 ml-auto">
          <h1>2 hours ago</h1>
        </div>
      </div>
    </div>
  );
};

export default Messages;
