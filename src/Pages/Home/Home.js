import React from 'react';
import Banner from '../../Banner/Banner';
import ContactUs from './ContactUs/ContactUs';
import Hero from './Hero/Hero';
import Info from './Info';
import MakeAppiontment from './MakeAppiontment/MakeAppiontment';
import Services from './Services/Services';
import TestoMonial from './Testomonial/TestoMonial';


const Home = () => {
    return (
        <div className=''>
            <Banner/>
            <Info/>
            <Services/>
            <Hero/>
            <MakeAppiontment/>
            <TestoMonial/>
            <ContactUs/>
        </div>
    );
};

export default Home;