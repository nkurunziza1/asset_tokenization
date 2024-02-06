"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
  display: 'swap',
})

type NavbarLinkType = {
  label: string;
  link: string;
};

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState<string>('');

  const sidebarLinks: NavbarLinkType[] = [
    {
      label: 'Dashboard',
      link: '/dashboard',
    },
    {
      label: 'Create Asset',
      link: '/dashboard/createasset',
    },
    {
      label: 'My Asset',
      link: '/dashboard/myasset',
    },
    {
      label: 'History',
      link: '/dashboard/history',
    },
  ];

  // Function to handle link click and set active link
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  // Get the current pathname
  const currentPathname = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <div className="flex flex-col ring-1 ring-gray-800 gap-4 justify-between bg-gray-900">
      <div className="px-4 py-6 h-screen">
        <span className="grid h-10 w-32 place-content-center rounded-lg text-xs text-gray-600">
          <img src="/logo2-removebg-preview.png" alt="" style={{ marginTop: '30px' }} />
        </span>
        <ul className="mt-14 space-y-1 fixed">
          {sidebarLinks.map(({ label, link }: NavbarLinkType, index: number) => (
            <li className="w-full" key={index}>
              <a
                href={link}
                className={`block  transition-all duration-300 ease-in-out rounded-lg px-4 py-2 text-md  ${roboto.className}  ${
                  currentPathname === link ? 'text-gray-700 bg-gray-100' : 'text-white hover:bg-gray-100 hover:text-gray-700'
                }`}
                onClick={() => handleLinkClick(link)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar