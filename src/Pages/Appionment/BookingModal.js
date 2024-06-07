import axios from "axios";
import { format } from "date-fns";
import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import toast, { Toaster } from 'react-hot-toast';

const BookingModal = ({ treatment, date, setTreatment, refetch }) => {
  const [user] = useAuthState(auth);
  const { _id, name, slots } = treatment;
  const selectedDate = "Please Select a Day";
  const formattedDate = format(date, "PP");
  const handleSumbmit = (event) => {
    event.preventDefault();
    const slot = event.target.slot.value;

    const patientNumber = event.target.number.value;

    const bookingInfo = {
      treatmentId: _id,
      treatment: name,
      slot,
      date: formattedDate,
      patientName: user?.displayName,
      email: user?.email,
      img: user?.photoURL,
      number: patientNumber,
    };

    // console.log(_id,name,slot,patientname,patienEmail,patientNumber);

    axios.post("https://doctors-portal-server-hiuzvttvk-narrow-spaces-projects.vercel.app/booking", bookingInfo).then(
      (res) => {
        const data = res.data;
        console.log(data);
        if (res.data.success) {
          toast.success(`Appiontment is set,${formattedDate}at${slot}`)
          
        } else {
          toast.error(`Already have an appiontment on,${data.booking?.date}at${data.booking?.slot}`)
         
        }
      },

      (error) => {
        console.log(error);
      }
    );
    setTreatment(null);
    refetch();
  };

  return (
    <div className="dark:bg-black dark:text-white ">
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box relative w-80 dark:bg-black dark:text-white	">
          <label
            htmlFor="booking-modal"
            className="btn  text-white btn-sm btn-circle absolute  right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-semibold">{name}</h3>
          <form
            onSubmit={handleSumbmit}
            className="grid grid-cols-1 gap-4 justify-items-center mt-3 text-2xl "
          >
            {date ? (
              <input
                type="text"
                disabled
                value={format(date, "PP")}
                className="input input-bordered w-full max-w-xs dark:text-black "
              />
            ) : (
              <input
                type="text"
                disabled
                value={selectedDate}
                className="input input-bordered w-full max-w-xs dark:text-black "
              />
            )}

            <select
              name="slot"
              className="select select-bordered dark:text-black  w-full max-w-xs"
            >
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="name"
              disabled
              value={user?.displayName || ""}
              className="input input-bordered w-full max-w-xs dark:text-black "
            />
            <input
              type="email"
              disabled
              name="email"
              value={user?.email || ""}
              className="input input-bordered w-full max-w-xs dark:text-black "
            />
            <input
              type="text"
              name="number"
              placeholder="Phone number"
              className="input input-bordered w-full max-w-xs dark:text-black "
            />

            <input
              type="submit"
              value="submit"
              className="btn btn-primary text-white w-full max-w-xs dark:btn-close-white "
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
