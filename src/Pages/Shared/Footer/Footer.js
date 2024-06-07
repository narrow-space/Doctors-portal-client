import React from 'react';
import {Link} from "react-router-dom"


const Footer = () => {
    return (
        <div className="bg-[url('/src/assets/images/footer.png')] bg-cover  bg-no-repeat bg-center 	 ">
            <footer className=" footer pl-4 py-10  ">
  <div className=' text-normal lg:justify-self-center'>
    <span className=" footer-title">Services</span> 
    <Link to="" className="link link-hover">Emergency Checkup</Link>
    <Link to="" className="link link-hover">Monthly Checkup</Link>
    <Link to="" className="link link-hover">Weekly Checkup</Link>
    <Link to="" className="link link-hover">Deep Checkup</Link>
  </div> 
  <div className='lg:justify-self-center'>
    <span className="footer-title">ORAL HEALTH</span> 
    <Link to="" className="link link-hover">Fluoride Treatment</Link>
    <Link to="" className="link link-hover">Cavity Filling</Link>
    <Link to="" className="link link-hover">Teath Whitening</Link>
    <Link to="" className="link link-hover"></Link>
  </div> 
  <div className='lg:justify-self-center'>
    <span className="footer-title">OUR ADDRESS</span> 
    <Link to=""  className="link link-hover">New York - 101010 Hudson</Link>
    
  </div>
  
</footer>
<footer className="font-medium	 footer footer-center p-4  text-base-content">
  <div>
    <p>Copyright © 2022 - All right reserved Imran</p>
  </div>
</footer> 
        </div>
    );
};

export default Footer;