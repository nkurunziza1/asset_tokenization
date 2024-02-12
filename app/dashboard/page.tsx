"use client";
import React, { useState } from "react";

const Dashboard = () => {
  const data = [
    {
      name: "Asset",
      image: "/Digital-assets.jpg",
      status: "not for sale",
      assetId: "123455",
      telephone: "0783186898",
      location: "Karuruma",
    },
    {
      name: "Asset",
      image: "/Digital-assets.jpg",
      status: "not for sale",
      assetId: "123455",
      telephone: "0783186898",
      location: "Karuruma",
    },
    {
      name: "Asset",
      image: "Digital-assets.jpg",
      status: "sale",
      assetId: "123455",
      telephone: "0783186898",
      location: "Karuruma",
    },
    {
      name: "Asset",
      image: "/Digital-assets.jpg",
      status: "sale",
      assetId: "123455",
      telephone: "0783186898",
      location: "Karuruma",
    },
  ];
  return (
    <>
      {" "}
      <section className="pb-4">
        <div className="font-serif  flex items-center gap-4">
          <div className="ring-1 p-4 w-[50%] text-white ring-gray-800 bg-gray-900">
            Total asset
            <br></br>
            <span className="text-xl">50</span>
          </div>

          <div className="ring-1 p-4 w-[50%] text-white ring-gray-800 bg-gray-900">
            Total safe transfers
            <br></br>
            <span className="text-xl">150</span>
          </div>
        </div>
      </section>
      <section className="flex font-normal flex-col gap-3">
        {data.map((items, index) => (
          <div key={index} className="flex bg-white   rounded-lg ">
            <img src={items.image} alt={items.name} width={300} height={50} />
            <div className="flex flex-col p-4">
              <p className="text-xl font-mono">{items.name}</p>
              <p></p>
              <div className="flex justify-between w-full">
                <div>
                  <p>Asset ID: {items.assetId}</p>
                  <p>Telephone: {items.telephone}</p>
                </div>

                <div>
                  <p>location: {items.location}</p>
                </div>
              </div>
              <div className="flex justify-between gap-8 mt-20">
                <p
                  className={`${
                    items.status !== "not for sale"
                      ? "text-green-400"
                      : "text-red-300"
                  }`}
                >
                  <span className="text-black">status:</span> {items.status}
                </p>
                <a href="" className="text-blue-900 underline">
                  Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Dashboard;
