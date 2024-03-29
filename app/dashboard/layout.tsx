import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/dashboardbars/Sidebar";
import Navbar from "../components/dashboardbars/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<div className="flex ring-1 ring-pink-500 bg-gray-900">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <div className="mt-[8rem] ml-[5rem]  w-80% md:w-full lg:w-full p-5 ">
          <div className="mt-10">
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
