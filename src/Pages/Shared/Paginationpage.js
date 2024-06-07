import React, { useEffect } from "react";
import { useState } from "react";

const Paginationpage = ({ showPerPage, onpaginationChange, total,refetch }) => {
  const [counter, setCounter] = useState(1);
  const [numberOfButtons, setNumberOfButtons] = useState(
    Math.ceil(total / showPerPage)
  );
  console.log(total);
 
  useEffect(() => {
    const value = showPerPage * counter;

    onpaginationChange(value - showPerPage, value);
  }, [counter]);

   

  const ButtonType = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
        
      } else {
        setCounter(counter + 1);
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="btn-group ">
        <button
          data-theme="halloween"
          onClick={() => ButtonType("prev")}
          className="btn btn-sm btn-active mx-3"
        >
          Previous page
        </button>
      </div>
      <div className="btn-group ">
        { new Array(numberOfButtons).fill(" ").map((el, index) => (
          <button
            onClick={() => setCounter(index + 1)}
           
            className={`btn btn-sm  ${
              index + 1 === counter ? "btn-accent" : null
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="btn-group grid grid-cols-1 mx-3">
        <button
          data-theme="halloween"
          onClick={() => ButtonType("next")}
          className="btn btn-sm btn-active"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Paginationpage;
