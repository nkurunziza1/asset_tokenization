import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineMoon } from "react-icons/hi2";
import { FaRegMoon } from "react-icons/fa";

const Navbar = () => {
  return (
    <React.Fragment>
      <div className="">
        <nav className="fixed w-[100%] ring-1 ring-gray-800 bg-gray-900 top-0 z-50  dark:bg-gray-800 dark:border-gray-700">
          <div className="flex w-[90%] cursor-pointer justify-end  gap-4 p-6 text-3xl text-second-color">
          <p className="text-white">00.04icp</p>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg"
              alt="avatar"
              width={40}
              height={40}
             className=" rounded-full"
            />
            <div className="bg-blue-500 cursor-pointer w-[30px] text-white h-[30px] flex items-center justify-center rounded-full">
            <IoIosNotificationsOutline /> 
            </div>
            <div className=" cursor-pointer font-thin w-[30px] text-white h-[30px] flex items-center justify-center rounded-full">
            <HiOutlineMoon />    
            </div>
            
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
