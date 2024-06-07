import React from 'react';
import floride from "../../../assets/images/fluoride.png"
import cavity from "../../../assets/images/cavity.png"
import teethwhitening from "../../../assets/images/whitening.png"
import Service from './Service';

const Services = () => {
    const services = [

        {
            _id: 1,
            name: 'Fluoride Treatment',
            description: 'Fluoride treatment helps to prevent cavities by strengthening the enamel and making it more resistant to acid attacks.',
            img:floride
        }


               ,
        {
            _id:2,
            name: 'Cavity Protection',
            description: 'Preventing cavities is essential for maintaining good oral health and preventing dental problems such as toothaches, infections, and tooth loss.',
            img:cavity
           
           
                           },
        {
            _id:3,
            name: 'Teeth Whitening',
            description: 'Teeth whitening can be performed either at a dental office or at home using whitening kits. In-office procedures usually involve applying a bleaching agent directly to the teeth and activating it with a special light or laser. Home kits typically consist of custom-fitted trays filled with a bleaching gel that you wear for a specified period.',
            img:teethwhitening
                   
                   
                                   }


    ]
    return (
        <div className='my-36 px-12  '>
            <h3 className=' font-sans  text-center text-2xl font-bold  leading-7	my-1.5 '>Our Services</h3>
            <h2 className=' font-sans text-center text-4xl font-normal leading-[3rem]  '>Services We Provide</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3  gap-4'>
                {
                    services.map(sr=><Service key={sr._id}  Service={sr}></Service>)
                }
            </div>
        </div>
    );
};

export default Services;