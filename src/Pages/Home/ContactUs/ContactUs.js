import React from 'react';
import Primarybtn from '../../Shared/PrimaryBtn/Primarybtn';

const ContactUs = () => {
    return (
        <section className="h-96 lg:h-4/6 bg-[url('/src/assets/images/appointment.png')]">
            
            <div className=' flex  flex-col items-center justify-center align-middle gap-2'>
            <h3 className='text-secondary font-bold text-xl mt-3'>Contact US</h3>
            <h2 className='text-3xl text-white'>Stay connected with us</h2>
            
                 
                <input type="text" placeholder="Email Adress" className="input input-bordered w-80 lg:w-1/3 " />
                <input  type="text" placeholder="Subject" className="input input-bordered w-80 lg:w-1/3 " />
                <textarea  type="text" placeholder="Your Massage" className="w-80 h-32	lg:w-1/3 textarea textarea-info  " />
                <Primarybtn className="">Submit</Primarybtn>

            </div>
        </section>
    );
};

export default ContactUs;