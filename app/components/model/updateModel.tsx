"use client";
import React, { useState, Fragment, useEffect, useRef, useMemo } from "react";
import { FaNewspaper } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { UpdateStatus } from "@/app/utils/types";


const updateModel = ({
  onclose,
  isOpen = false,
  handleUpdate,
  id,
}: UpdateStatus) => {
  const [loading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [editorError, setEditError] = useState(null);
  const editor = useRef(null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed left-0 top-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-50 md:h-screen"
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
            
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default updateModel;
