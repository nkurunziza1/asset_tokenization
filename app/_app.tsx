// _app.js
import App, { AppProps } from "next/app";
import { InternetIdentityProvider } from "ic-use-internet-identity";
import { Toaster } from "react-hot-toast";
import Actors from "./ic/Actors"


import "../styles/globals.css";

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <>
      {/* <InternetIdentityProvider> */}
        {/* <Actors> */}
         <Component {...pageProps} />   
        {/* </Actors> */}
      {/* </InternetIdentityProvider> */}
    </>
  );
}

export default MyApp;