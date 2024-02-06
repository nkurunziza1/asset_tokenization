import "./globals.css";
import { Inter } from "next/font/google";
import { InternetIdentityProvider } from "ic-use-internet-identity";
import { Toaster } from "react-hot-toast";
import { Open_Sans } from "next/font/google";
import Actors from "./ic/Actors";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
