
import { useInternetIdentity } from "ic-use-internet-identity";
import { useEffect } from "react";

export default function LoginButton() {
  const { isLoggingIn, login, clear, identity } = useInternetIdentity();

  // If the user is logged in, clear the identity. Otherwise, log in.
  function handleClick() {
    if (identity) {
      clear();
      window.location.reload()
    } else {
      login();
      
    }
  }
  useEffect(() => {
    if(identity){
      window.location.href="/dashboard"
    }
  })
  let  className="block rounded-md bg-gradient-to-r from-green-300 via-blue-500 to-purple-600  px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
  const text = () => {
    if (identity) {
      return "Logout";
    } else if (isLoggingIn) {
      return (
        <>
         Get Started
         ....
        </>
      );
    }
    return "Login";
  };

  return (
    <button onClick={handleClick} className={className} disabled={isLoggingIn}>
      {text()}
    </button>
  );
}
