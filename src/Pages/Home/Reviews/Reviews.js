import React from 'react';

const Reviews = ({ rw }) => {
    return (
        <div>
            <div className="card dark:bg-black  dark:text-white shadow-xl">
                <div className="card-body">
                    <p className='font-normal'>{rw.review}</p>
                    <div className='flex items-center'>
                        <div className="avatar">
                            <div className="w-16 rounded-full ring ring-secondary ring-offset-base-100 mr-5">
                                <img className='' src={rw.img}/>
                                
                            </div>
                            
                        </div >
                        
                       <div className=''>
                       <h2 className="card-title text-xl">{rw.name}</h2>
                       <p className='font-normal text-xl'>Califonia</p>
                       </div>
                        
                    </div>
                  

                </div>
            </div>
        </div>
    );
};

export default Reviews;