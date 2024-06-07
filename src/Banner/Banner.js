import { motion } from "framer-motion";
import React from "react";
import chair from "../../src/assets/images/chair.png";
import { animationX, animationY } from "../Pages/Shared/motion";
import Primarybtn from "../Pages/Shared/PrimaryBtn/Primarybtn";


const Banner = () => {
 
  return (
    <div className="banner-div bg-[url('/src/assets/images/bg.png')] bg-cover  bg-no-repeat bg-center lg:mt-[-100px] ">
      <div className="hero min-h-screen  ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <motion.img
          {...animationX}
            src={chair}
            className="pic rounded-lg shadow-2xl lg:w-2/4"
            alt=""
          />
          <div>
            <motion.h1 {...animationX} className="text-5xl font-bold">
              Your New Smile Starts Here
            </motion.h1>
            <motion.p {...animationX} className="py-6">
            Welcome to our comprehensive guide to dental care! In this information-packed resource, we'll explore everything you need to know to maintain optimal oral health and achieve a beautiful smile. From preventive care to advanced treatments, we've got you covered.
            </motion.p>
            <motion.div
             {...animationY}
            >
            <Primarybtn>GET STARTED</Primarybtn>
            </motion.div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
