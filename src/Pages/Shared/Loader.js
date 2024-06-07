import React from 'react';
import PropagateLoader from "react-spinners/ClipLoader";
const Loader = () => {
  return (

    <div className="   h-screen flex items-center justify-center space-x-2 ">

      <PropagateLoader size={110} color="#36d7b7" />

    </div>

  );
};

export default Loader;