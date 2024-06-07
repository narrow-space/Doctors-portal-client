import React, { useState } from "react";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import Loader from "../Shared/Loader";



const RequireAuth = ({ children }) => {
  const [sendEmailVerification] =
    useSendEmailVerification(auth);
  const [user, loading] = useAuthState(auth);
  const [message, setMessage] = useState(false);

  const location = useLocation();
  if (loading) {
    return <Loader />;
  }

  if (user) {
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
     
  }
 
  const link = async () => {
    await sendEmailVerification(user?.email);
  };
  const locale = "en";
  const today = new Date();
  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  const hour = today.getHours();
  const wish = `Good ${
    (hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
  }, `;
  let toastify;

  if (message) {
    toastify = (
      <div
        className="   bg-green-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3"
        id="static-example"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-mdb-autohide="false"
      >
        <div className="bg-green-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-400 rounded-t-lg">
          <p className="font-bold text-white flex items-center">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="check-circle"
              className="w-4 h-4 mr-2 fill-current"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
              ></path>
            </svg>
            message sent
          </p>
          <div className="flex items-center">
            <p className="text-white opacity-90 text-xs font-bold">
              {time}
              {wish}
            </p>
            <button
              type="button"
              className="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
              data-mdb-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div className="p-3 bg-green-500 rounded-b-lg break-words text-white">
          verrification message sent to {user?.email}
        </div>
      </div>
    );
  }

  const addtoast = () => {
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 5000);
  };

  if (!user?.emailVerified) {
    return (
      <div>
        <div
          data-theme="synthwave"
          class=" flex justify-center items-center h-screen"
        >
          <div>
            {toastify}
            <div className="">
              <h2> ❌❌❌ Please Verifying Your Email First 🚀🚀🚀 </h2>
              <div className="flex justify-center items-center mt-7">
                <button
                  onClick={() => {
                    link();
                    addtoast();
                  }}
                  className="btn btn-outline btn-error"
                >
                  Sent verification🚀🚀
                </button>
              </div>
            </div>
          </div>
        </div>

       </div>
     
    );
  }

  return children;
};

export default RequireAuth;
