"use client"
import React, { useState } from 'react';
import DataTable from "react-data-table-component";
import { BsThreeDotsVertical } from "react-icons/bs";
import data from "../../utils/data/data.json"


type HistoryData = {
  name: string;
  to: string;
  from: string;
  date: string;
};

const MyAsset = () => {

  const columns = [
    {
      name: "Asset Name",
      cell: (row: HistoryData) => <div className="text-white">{row.name}</div>,
      sortable: true,
    },
    {
      name: "owner",
      cell: (row: HistoryData) => (
        <div className="text-white w-full">{row.from}</div>
      ),
      sortable: true,
    },
    {
      name: "Token",
      cell: (row: HistoryData) => <div className="text-white">{row.to}</div>,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: HistoryData) => <div className="text-white bg-red-400 px-6 py-2 rounded-md">not for sell</div>,
      sortable: true,
    },
    {
      name: "Date",
      cell: (row: HistoryData) => (
        <button className="text-white  w-[90%] bg-green-400 rounded-md p-2">
          50icp/Buy
        </button>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: HistoryData) => (
        <BsThreeDotsVertical className="text-white cursor-pointer" />
      ),
    },
  ];

  const [records, setRecords] = useState<HistoryData[]>(data);

  function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
    const newData = data.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    setRecords(newData);
  }

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#374151",
      },
    },
    rows: {
      style: {
        backgroundColor: "#1F2937",
      },
    },
    headCells: {
      style: {
        color: "white",
      },
    },
    pagination: {
      style: {
        color: "white",
        backgroundColor: "#374151",
      },
      pageButtonsStyle: {
        color: "white",
        backgroundColor: "#374151",
      },
    },
  };


 
  
  return (
    <div>
      <div className="font-serif flex items-center gap-4">
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
      <p
        className=""
        style={{
          background:
            "linear-gradient(to bottom left, #e07934, #964680, #4421a0)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Register your asset and top up your account to start trading on icp
        through assetTok technolog
      </p>
      <div className="bg-gray-800 p-10">
        <input
          type="text"
          placeholder="Search Asset name"
          onChange={handleFilter}
          className="text-white mb-4 bg-gray-900 p-2 gap-4 rounded-md"
        />
        <DataTable
          columns={columns}
          data={records}
          selectableRows
          fixedHeader
          pagination
          customStyles={customStyles}
        />
      </div>
      <div className="mx-auto max-w-[500px] w-full">
    
      </div>
      
    </div>
  );
}

export default MyAsset