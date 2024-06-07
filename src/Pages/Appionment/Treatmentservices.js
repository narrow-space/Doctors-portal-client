import React from 'react';

const Treatmentservices = ({ts}) => {
    const {name}=ts
    return (
        <div className='hidden lg:block '>
            <div className="card w-96 dark:bg-black  dark:text-white shadow-2xl">
  <div className="card-body items-center">
    
    <p className='text-secondary font-semibold	'>{name}</p>
  </div>
</div>
        </div>
    );
};

export default Treatmentservices;