
import { AuthClient } from "@dfinity/auth-client";
import { useEffect } from "react";


const IDENTITY_PROVIDER = `http://127.0.0.1:5500/?canisterId=ajuq4-ruaaa-aaaaa-qaaga-cai`;
const MAX_TTL = 7 * 24 * 60 * 60 * 1000 * 1000 * 1000;

export async function getAuthClient() {
    return await AuthClient.create();
}

export async function login() {
     let    authClient = authClient = window.auth.client;
     let   isAuthenticated = await authClient.isAuthenticated();

    if (!isAuthenticated) {
        await authClient?.login({
            identityProvider: IDENTITY_PROVIDER,
            onSuccess: async () => {
                window.auth.isAuthenticated = await authClient.isAuthenticated();
                window.location.reload();
            },
            maxTimeToLive: MAX_TTL,
        });
    }
}

export async function logout() {
        const authClient = window.auth.client;
    authClient.logout();
    window.location.reload();    

}

// import { AuthClient } from "@dfinity/auth-client";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { createActor, canisterId } from "@/config/declarations/dfx_generated";

// const AuthContext = createContext();

// const defaultOptions = {
//   /**
//    *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
//    */
//   createOptions: {
//     idleOptions: {
//       // Set to true if you do not want idle functionality
//       disableIdle: true,
//     },
//   },
//   /**
//    * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
//    */
//   loginOptions: {
//     identityProvider:
//       process.env.DFX_NETWORK === "ic"
//         ? "https://identity.ic0.app/#authorize"
//         : `http://localhost:4943?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai#authorize`,
//   },
// };

// /**
//  *
//  * @param options - Options for the AuthClient
//  * @param {AuthClientCreateOptions} options.createOptions - Options for the AuthClient.create() method
//  * @param {AuthClientLoginOptions} options.loginOptions - Options for the AuthClient.login() method
//  * @returns
//  */
// export const useAuthClient = (options = defaultOptions) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [authClient, setAuthClient] = useState(null);
//   const [identity, setIdentity] = useState(null);
//   const [principal, setPrincipal] = useState(null);
//   const [whoamiActor, setWhoamiActor] = useState(null);

//   useEffect(() => {
//     // Initialize AuthClient
//     AuthClient.create(options.createOptions).then(async (client) => {
//       updateClient(client);
//     });
//   }, []);

//   const login = () => {
//     authClient.login({
//       ...options.loginOptions,
//       onSuccess: () => {
//         updateClient(authClient);
//       },
//     });
//   };

//   async function updateClient(client) {
//     const isAuthenticated = await client.isAuthenticated();
//     setIsAuthenticated(isAuthenticated);

//     const identity = client.getIdentity();
//     setIdentity(identity);

//     const principal = identity.getPrincipal();
//     setPrincipal(principal);

//     setAuthClient(client);

//     const actor = createActor(canisterId, {
//       agentOptions: {
//         identity,
//       },
//     });

//     setWhoamiActor(actor);
//   }

//   async function logout() {
//     await authClient?.logout();
//     await updateClient(authClient);
//   }

//   return {
//     isAuthenticated,
//     login,
//     logout,
//     authClient,
//     identity,
//     principal,
//     whoamiActor,
//   };
// };

// /**
//  * @type {React.FC}
//  */
// export const AuthProvider = ({ children }) => {
//   const auth = useAuthClient();

//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);

import { AuthClient } from "@dfinity/auth-client";
import { handleAuthenticated, renderIndex } from "./views";

const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);


export const defaultOptions = {
    createOptions: {
      idleOptions: {
        disableIdle: true,
      },
    },
    loginOptions: {
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          : `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai#authorize`,
      
      maxTimeToLive: days * hours * nanoseconds,
    },
  };

  const init = async () => {
    const authClient = await AuthClient.create(defaultOptions.createOptions);
  
    if (await authClient.isAuthenticated()) {
      handleAuthenticated(authClient);
    }
    renderIndex();
    setupToast();
  };


  export async function setupToast() {
    const status = document.getElementById("status");
    const closeButton = status?.querySelector("button");
    closeButton?.addEventListener("click", () => {
      status?.classList.add("hidden");
    });
  }
  
  
  init();