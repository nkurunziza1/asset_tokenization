"use client"
import React, { useState } from 'react';
import data from "../../utils/data/data.json";
import DataTable from 'react-data-table-component';
import { truncateText } from '@/app/utils/ReUsableFuntion/truncet';
import { BsThreeDotsVertical } from "react-icons/bs";

type HistoryData = {
  name: string,
  to: string,
  from: string,
  date: string
};

const History = () => {
  const columns = [
    {
      name: "Name",
      cell: (row: HistoryData) => <div className='text-white text-ellipsis'>{row.name}</div>,
      sortable: true
    },
    {
      name: "From",
      cell: (row: HistoryData) => <div className='text-white w-full text-ellipsis'>{row.from}</div>,
      sortable: true
    },
    {
      name: "To",
      cell: (row: HistoryData) => <div className='text-white text-ellipsis'>{row.to}</div>,
      sortable: true
    },
    {
      name: "Date",
      cell: (row: HistoryData) => <div className='text-white text-ellipsis'>{row.date}</div>,
      sortable: true
    },
    {
      name: "Action",
      cell: (row: HistoryData) => <BsThreeDotsVertical className='text-white cursor-pointer' />
    }
  ];

  const [records, setRecords] = useState<HistoryData[]>(data);

  function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
    const newData = data.filter(row =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  }

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#374151', 
      },
    },
    rows: {
      style: {
        backgroundColor: '#1F2937', 
      }
    },
    headCells: {
      style: {
        color: 'white', 
      },
    },
    pagination: {
      style: {
        color: 'white',
        backgroundColor: '#374151', 
      },
      pageButtonsStyle: {
        color: 'white',
        backgroundColor: '#374151', 
      }
    }
  };

  return (
    <div className='bg-gray-800 p-10'>
      <input
        type="text"
        placeholder='Search your token name'
        onChange={handleFilter}
        className='text-white mb-4 bg-gray-900 p-2 gap-4 rounded-md'
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
  );
};

export default History;
