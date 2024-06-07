import { motion } from 'framer-motion';
import React from 'react';
import { animationX } from '../../Shared/motion';

const Service = ({Service,delay=0}) => {
    return (
        <motion.div 
         {...animationX}
         
        className="card shadow-xl ">
  <figure className="px-10 pt-10 ">
    <img className='w-28 h-28 rounded-xl'  src={Service.img} alt="Shoes" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{Service.name}</h2>
    <p>{Service.description}</p>
    
  </div>
</motion.div>
    );
};

export default Service;