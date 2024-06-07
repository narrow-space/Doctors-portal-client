import React from 'react';

const Primarybtn = ({children}) => {
    return (
        <>
           <button className="btn  btn-secondary bg-gradient-to-r from-secondary to-accent  text-white font-bold">{children}</button> 
        </>
    );
};

export default Primarybtn;