import React, { useEffect, useState } from "react";
import chair from "../../assets/images/chair.png";
import AvailableAppiontment from "./AvailableAppiontment";
import Treatmentservices from "./Treatmentservices";
import moment from "moment";
import { DayPicker, ClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { motion } from "framer-motion";
import { format } from "date-fns";

const Appiontment = ({ setTheme, theme }) => {
  const [date, setDate] = useState(moment().toDate());
  const treatServices = [
    { _id: 1, name: "Teeth Orthodontics" },
    { _id: 2, name: "Cosmetic Dentistry" },
    { _id: 3, name: "Teeth Cleaning" },
    { _id: 4, name: "Cavity Protection" },
    { _id: 5, name: "Pediatric Dental" },
    { _id: 6, name: "Oral Surgery" },
  ];

  const spring = {
    type: "spring",
    damping: 10,
    stiffness: 100,
  };

  const darkThemeCSS = `
    .my-selected:not([disabled]) { 
      font-weight: bold; 
      border: 2px solid white;
      background-color: white;
      color: black; /* Ensuring selected date text color is black in dark mode */
    }
    .my-selected:hover:not([disabled]) { 
      border-color: red;
      background-color: blue;
      color: black; /* Ensuring hover date text color is black in dark mode */
    }
    .my-today { 
      font-weight: bold;
      font-size: 140%; 
      color: black; /* Ensuring today date text color is black in dark mode */
      background-color: #17D2BA;
    }
    .rdp-button:not([disabled]) {
      cursor: pointer;
    }
    .rdp-button:hover:not([disabled]) {
      background-color: white;
      border: 2px solid white;
      font-weight: bold;
      font-size: 140%; 
      color: black; /* Ensuring hover date text color is black in dark mode */
    }
    .custom-head { color: white }
    .rdp-tbody {
      color: white;
    }
    .rdp-nav {
      color: red;
    }
    .rdp-head {
      color: white;
    }
  `;

  const lightThemeCSS = `
    .custom-head { color: black }
    .my-selected:not([disabled]) { 
      font-weight: bold; 
      border: 2px solid #17D2BA;
      color: black; /* Ensuring selected date text color is black in light mode */
    }
    .my-selected:hover:not([disabled]) { 
      border-color: #17D2BA;
      color: #17D2BA;
    }
    .my-today { 
      font-weight: bold;
      font-size: 140%; 
      color: #17D2BA;
    }
  `;

  return (
    <div>
      <div className="hero min-h-screen bg-[url('/src/assets/images/bg.png')] bg-cover bg-center bg-no-repeat">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <motion.img
            initial={{ x: "100%", opacity: "0" }}
            whileInView={{ x: 0, opacity: 0.7 }}
            transition={{ delay: 0.1 }}
            src={chair}
            className="lg:w-[500px] rounded-lg shadow-2xl mx-10"
            alt=""
          />
          <div className="w-auto">
            <style>{theme === "dark" ? darkThemeCSS : lightThemeCSS}</style>
            <div
              initial={{ x: "-150%", opacity: "0" }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate}
                modifiersClassNames={{
                  selected: "my-selected",
                  today: "my-today",
                }}
                modifiersStyles={{
                  disabled: { fontSize: "75%" },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-2 px-12 my-5">
        {treatServices.map((ts) => (
          <Treatmentservices key={ts._id} ts={ts}></Treatmentservices>
        ))}
      </div>
      <div>
      {
         date && (
          <AvailableAppiontment date={date} setDate={setDate}></AvailableAppiontment>
        )

      }
        
      </div>
    </div>
  );
};

export default Appiontment;
