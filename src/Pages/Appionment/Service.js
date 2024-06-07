import React from "react";

const Service = ({ sr, setTreatment }) => {
  const { name, slots,available } = sr;
  return (
    <div>
      <div className="card w-42 lg:h-auto lg:max-w-lg  shadow-xl">
        <div className="card-body flex items-center justify-center">
          <h5 className="text-xl font-semibold text-secondary">{name}</h5>
          <p className="text-semibold">{slots[0]}</p>
          <p>{slots?.length}spaces available</p>
          <label
            onClick={() => setTreatment(sr)}
            htmlFor="booking-modal"
            className="btn modal-button btn-secondary bg-gradient-to-r from-secondary to-accent text-white w-35 font-normal" 
          >Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default Service;
