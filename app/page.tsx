"use client"
import Link from "next/link";
import Image from "next/image";
import formatNumberWithCommas from "./utils/formt";
import Actors from "./ic/Actors";

const Login = dynamic(() => import("./components/login"), {ssr: false})


import { useEffect, useState } from "react";
import InMotion from "./components/InMotion";
import dynamic from "next/dynamic";
import { InternetIdentityProvider } from "ic-use-internet-identity";
const DynamicInternetIdentityProvider = dynamic(() => import('ic-use-internet-identity').then(mod => mod.InternetIdentityProvider), {
  ssr: false // Ensure it's only loaded on the client-side
});

const DynamicActors = dynamic(() => import('./ic/Actors'), {
  ssr: false // Ensure it's only loaded on the client-side
});


export default function Home() {
  const [icpCount, setIcpCount] = useState<number>(0);
  const [dollarCount, setDollarCount] = useState<number>(0);
  const [bitcoinCount, setBitcoinCount] = useState<number>(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setIcpCount((icpCount + 1) % 560);
      setDollarCount((dollarCount + 1) % 560);
      setBitcoinCount((bitcoinCount + 1) % 560);
    }, 60);

    return () => clearInterval(interval);
  }, [icpCount, dollarCount, bitcoinCount]);

  const navLink = [
    {
      label: "Home",
      link: "home",
    },
    {
      label: "About",
      link: "team",
    },
    {
      label: "Our Policies",
      link: "/policies",
    },
  ];

  return (
    <>
      {/* { */}
      {/* // isAuthenticated ? ( */}
      <DynamicInternetIdentityProvider>
        <DynamicActors>
          <div
        className="object-cover"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/Digital-assets.jpg')",
        }}
      >
        <Login />

        <nav>
          <header className="py-4">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
              <a className="block text-teal-600" href="/">
                <span className="sr-only">Home</span>
                <svg
                  className="h-8"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <div className="flex flex-1 items-center justify-end md:justify-between">
                <nav aria-label="Global" className="hidden md:block">
                  <ul className="flex items-center gap-6 text-sm">
                    {navLink.map((link, index) => (
                      <li key={index}>
                        <a
                          className="text-white transition hover:text-gray-500/75"
                          href="#"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="flex  items-center gap-4">
                  <div className="sm:flex sm:gap-4">
                    <a
                      className="block rounded-md bg-gradient-to-r from-green-300 via-blue-500 to-purple-600  px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                      href="/dashboard"
                    >
                      Get started
                    </a>
                  </div>

                  <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                    <span className="sr-only">Toggle menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>
        </nav>
        <section className=" pt-4 ">
          <div className="max-w-screen-xl px-4 py-2 sm:px-2 sm:py-6 lg:px-4 lg:py-8">
            <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
              <div className="mx-auto max-w-lg ml-8  lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
                <InMotion>
                  <h2
                    className="text-xl  py-8 font-bold sm:text-2xl"
                    style={{
                      background:
                        "linear-gradient(to bottom left, #e07934, #964680, #4421a0)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Start registering your asset & Ready for trading
                  </h2>
                </InMotion>
                <InMotion>
                  <p className="mt-2 text-sm text-left text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                    vero aliquid sint distinctio iure ipsum cupiditate? Quis,
                    odit assumenda? Deleniti quasi inventore, libero reiciendis
                    minima aliquid tempora. Obcaecati, autem.
                  </p>
                </InMotion>

                <InMotion>
                  <a
                    href="#"
                    className="mt-8 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600  inline-block rounded  px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                  >
                    Get Started Today
                  </a>
                </InMotion>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 bg-gray-900/50 rounded-xl  p-2 shadow-sm    ">
                <div className="block rounded-xl  p-2 shadow-sm  ">
                  <span className="inline-block rounded-lg  p-2">
                    <Image
                      src="/icp_logo.png"
                      alt="icp logo"
                      width={40}
                      height={20}
                    />
                  </span>

                  <h2 className="mt-2 font-bold text-xl font-sans  text-white">
                    <span className="text-sm">icp</span>589'
                    {formatNumberWithCommas(icpCount)}
                  </h2>
                </div>

                <div className="block rounded-xl  p-2 shadow-sm">
                  <span className="inline-block rounded-lg  p-2">
                    <Image src="/dollar.png" alt="" width={40} height={30} />
                  </span>

                  <h2 className="mt-2 font-bold text-xl font-sans  text-white">
                    <span>$</span>400'{formatNumberWithCommas(dollarCount)}
                  </h2>
                </div>
                <div className="block rounded-xl p-2 shadow-sm">
                  <span className="inline-block rounded-lg  p-3">
                    <Image src="/bitcoin.png" alt="" width={40} height={30} />
                  </span>

                  <h2 className="mt-2 font-bold text-xl font-sans  text-white">
                    <span className="text-sm">btc</span>978'
                    {formatNumberWithCommas(bitcoinCount)}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <main>
          <section className="bg-gray-900 text-white">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
              <InMotion>
                <div className="mx-auto max-w-lg text-center">
                  <h2 className="text-2xl font-bold sm:text-4xl">
                    Kickstart your marketing
                  </h2>

                  <p className="mt-4 text-gray-300">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Consequuntur aliquam doloribus nesciunt eos fugiat. Vitae
                    aperiam fugit consequuntur saepe laborum.
                  </p>
                </div>
              </InMotion>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <InMotion>
                  <a
                    className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                    href="/services/digital-campaigns"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-pink-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>

                    <h2 className="mt-4 text-xl font-bold text-white">
                      Digital campaigns
                    </h2>

                    <p className="mt-1 text-sm text-gray-300">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ex ut quo possimus adipisci distinctio alias voluptatum
                      blanditiis laudantium.
                    </p>
                  </a>
                </InMotion>
                <InMotion>
                  <a
                    className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                    href="/services/digital-campaigns"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-pink-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>

                    <h2 className="mt-4 text-xl font-bold text-white">
                      Digital campaigns
                    </h2>

                    <p className="mt-1 text-sm text-gray-300">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ex ut quo possimus adipisci distinctio alias voluptatum
                      blanditiis laudantium.
                    </p>
                  </a>
                </InMotion>
                <InMotion>
                  <a
                    className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                    href="/services/digital-campaigns"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-pink-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>

                    <h2 className="mt-4 text-xl font-bold text-white">
                      Digital campaigns
                    </h2>

                    <p className="mt-1 text-sm text-gray-300">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ex ut quo possimus adipisci distinctio alias voluptatum
                      blanditiis laudantium.
                    </p>
                  </a>
                </InMotion>
                <InMotion>
                  <a
                    className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                    href="/services/digital-campaigns"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-pink-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>

                    <h2 className="mt-4 text-xl font-bold text-white">
                      Digital campaigns
                    </h2>

                    <p className="mt-1 text-sm text-gray-300">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ex ut quo possimus adipisci distinctio alias voluptatum
                      blanditiis laudantium.
                    </p>
                  </a>
                </InMotion>

                <InMotion>
                  <a
                    className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                    href="/services/digital-campaigns"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-pink-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>

                    <h2 className="mt-4 text-xl font-bold text-white">
                      Digital campaigns
                    </h2>

                    <p className="mt-1 text-sm text-gray-300">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ex ut quo possimus adipisci distinctio alias voluptatum
                      blanditiis laudantium.
                    </p>
                  </a>
                </InMotion>
                <InMotion>
                  <a
                    className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                    href="/services/digital-campaigns"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-pink-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>

                    <h2 className="mt-4 text-xl font-bold text-white">
                      Digital campaigns
                    </h2>

                    <p className="mt-1 text-sm text-gray-300">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ex ut quo possimus adipisci distinctio alias voluptatum
                      blanditiis laudantium.
                    </p>
                  </a>
                </InMotion>
              </div>
              <InMotion>
                <div className="mt-12 text-center">
                  <a
                    href="#"
                    className="inline-block rounded bg-pink-600 px-12 py-2 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
                  >
                    Start Trading
                  </a>
                </div>
              </InMotion>
            </div>
          </section>
        </main>
        <footer>
          <footer className="bg-white ">
            <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
              <InMotion>
                <div className="text-center">
                  <h2 className="text-2xl font-extrabold text-gray-900 sm:text-5xl">
                    Customise Your Product
                  </h2>

                  <p className="mx-auto  mt-4 max-w-sm text-gray-500">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Cum maiores ipsum eos temporibus ea nihil.
                  </p>

                  <a
                    href="#"
                    className="mt-8 inline-block rounded-full border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                  >
                    Get Started
                  </a>
                </div>
              </InMotion>

              <div className="mt-16 border-t border-gray-100 pt-8 sm:flex sm:items-center sm:justify-between lg:mt-24">
                <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 transition hover:opacity-75"
                    >
                      {" "}
                      Terms & Conditions{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-500 transition hover:opacity-75"
                    >
                      {" "}
                      Privacy Policy{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-500 transition hover:opacity-75"
                    >
                      {" "}
                      Cookies{" "}
                    </a>
                  </li>
                </ul>

                <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
                  <li>
                    <a
                      href="/"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      <span className="sr-only">Facebook</span>

                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="/"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      <span className="sr-only">Instagram</span>

                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="/"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      <span className="sr-only">Twitter</span>

                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="/"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      <span className="sr-only">GitHub</span>

                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="/"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      <span className="sr-only">Dribbble</span>

                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
          {/* <button onClick={logout}>logout</button> */}
        </footer>
      </div>
        </DynamicActors>
      </DynamicInternetIdentityProvider>
      
      {/* ): ( */}
      {/* <button onClick={login}>connect</button>    */}
      {/* ) */}
      {/* } */}
    </>
  );
}
