import React from 'react';
import Infocard from './Infocard';
import clock from  "../../assets/icons/clock.svg"
import marker from  "../../assets/icons/marker.svg"
import phone from  "../../assets/icons/phone.svg"
import { animationX } from '../Shared/motion';

import { motion } from 'framer-motion';


const Info = () => {
    return (
        <div className=' info grid grid-cols-1 lg:grid-cols-3 px-12  gap-4 mt-20'>
          <motion.div
            initial= {{
                x: "-100%",
                opacity: "0",
              }}
              whileInView= {{
                x: 0,
                opacity: 1
              }}
              transition= {{
                delay: 0.4,
              }}
          >

          <Infocard 
            
            img={clock}  bg="bg-gradient-to-r from-secondary to-accent" cardTitle="Opening Hour"
            description="8:30 AM - 9:45 PM"
            ></Infocard>
          </motion.div>

           <motion.div
           initial= {{
            x: "-100%",
            opacity: "0",
          }}
          whileInView= {{
            x: 0,
            opacity: 1
          }}
          transition= {{
            delay: 0.5,
          }}>
           <Infocard img={marker} bg="bg-primary" cardTitle="Visit Our Location"
           description="123 Main St, Springfield"
           ></Infocard>
           </motion.div>
           <motion.div
           initial= {{
            x: "-100%",
            opacity: "0",
          }}
          whileInView= {{
            x: 0,
            opacity: 1
          }}
          transition= {{
            delay: 0.6,
          }}>
           <Infocard img={phone}  bg="bg-gradient-to-r from-secondary to-accent" cardTitle="Contact Us Now"
            description="+123 456 7890"
           ></Infocard>
           </motion.div>
        </div>
    );
};

export default Info;