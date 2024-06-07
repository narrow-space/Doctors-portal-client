import React from 'react';

import { motion } from 'framer-motion';
const Infocard = ({img,bg,cardTitle,description}) => {
    return (
        <div className={`${bg} card lg:card-side shadow-xl text-white `}>
  <figure className='px-5 pt-3'><img className='sm:w-22' src={img} alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title ">{cardTitle}</h2>
    <p>{description}</p>
    
  </div>
</div>
    );
};

export default Infocard;