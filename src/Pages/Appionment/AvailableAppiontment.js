import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loader from "../Shared/Loader";
import BookingModal from "./BookingModal";
import Service from "./Service";
const axios = require("axios");

const AvailableAppiontment = ({ footer, date, setDate }) => {
  const [treatment, setTreatment] = useState(null);

  const formatedDate = format(date, "MMM d, yyyy"); // Format date manually

  console.log(formatedDate)
  let selectedDate = "Please Select a Day";
  const {

    data: services,
    isLoading,
    error,
    refetch,
  } = useQuery(["availabe", formatedDate], () => fetch(`https://doctors-portal-server-chi-ten.vercel.app/available?date=${formatedDate}`).then(res =>
    res.json()
  )
  )


  console.log(services)



  if (isLoading) {
    return <Loader />
  }



  return (
    <>
      <div className="my-10">
        <div className="text-center text-secondary font-semibold">

          <p>Available Appiontment on {format(date, "PP")}</p>



        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3 px-5 lg:px-12 my-10">
          {services?.map((sr) => (
            <Service setTreatment={setTreatment} key={sr._id} sr={sr}></Service>
          ))}
        </div>
        {treatment && (
          <BookingModal
            setTreatment={setTreatment}
            treatment={treatment}
            date={date}
            refetch={refetch}
          ></BookingModal>
        )}
      </div>

    </>
  );
};

export default AvailableAppiontment;
