// import React, { useEffect, useState } from 'react'
// import { LoginButton } from '../utils/loginButton'
// import Principal from '../utils/principal'
// import { useInternetIdentity } from "ic-use-internet-identity";
// import { useBackend } from '../ic/Actors';
// import { InternetIdentityProvider } from 'ic-use-internet-identity';
// import { redirect } from 'next/navigation';
// import  Actors from "../ic/Actors"
// const Login = () => {
//     const { identity } = useInternetIdentity();
//     const { actor: backend } = useBackend();
//     const [principal, setPrincipal] = useState<string>();

//   useEffect(() => {
//     if (!identity) setPrincipal(undefined);
//   }, [identity]);

//   useEffect(() => {
//     if (identity && backend && !principal) {
//        backend.getPrinciple().then((p) => setPrincipal(p))
//       redirect("/dashboard")
//     }
    
//   }, [backend, identity, principal]);
// console.log(principal)
//   return (
//     <InternetIdentityProvider>
//      <Actors>
//      <div>
//        {identity ? "You are logged in." : "You are not logged in."}
//         <LoginButton />
//         <Principal principal={principal} />
//     </div>
//      </Actors>
//     </InternetIdentityProvider>
   
//   )
// }

// export default Login