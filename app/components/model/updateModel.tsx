"use client";
import React, { useState, Fragment, useEffect, useRef, useMemo } from "react";
import { FaNewspaper } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { UpdateStatus } from "@/app/utils/types";
import Select from "react-select";

const UpdateModel = ({
  onclose,
  isOpen = false,
  handleUpdate,
  id,
}: UpdateStatus) => {
  const State = [
    { value: "not for sale", label: "Not for Sale" },
    { value: "for sell", label: "for sell" },
    { value: "portion equit sell", label: "portion equit sell" },
  ];

  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [stateError, setStateError] = useState<string | null>(null);


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed h-full left-0 top-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-50 md:h-screen"
        onClose={onclose}
      >
        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Dialog.Panel className="  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <h1 className="flex justify-between uppercase text-success">
              Update asset status
            </h1>
            <div className="w-full">
              <label className="text-white">Trade State</label>
                <Select
                  options={State.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                  value={
                    selectedState
                      ? {
                          value: selectedState,
                          label: selectedState,
                        }
                      : null
                  }
                  onChange={(selectedOption: any) => {
                    setSelectedState(selectedOption.value);
                    setCategoryError(null);
                  }}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "rgb(17 24 39 / var(--tw-bg-opacity))", // Set the background color here
                      color: "white !important",
                      border: state.isFocused
                        ? "0px solid #4a5568"
                        : "0px solid #4a5568",
                    }),
                    //@ts-ignore
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#2d3748" : null,
                      color: "black",
                      cursor: "pointer",
                      transition: "all 0.5s", 
                    }),
                  }}
                />
                {stateError && <div className="text-red-500">{stateError}</div>}
              </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default UpdateModel;
