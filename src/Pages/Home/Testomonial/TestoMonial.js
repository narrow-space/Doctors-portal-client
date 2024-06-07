import React from 'react';
import qoute from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import Reviews from '../Reviews/Reviews';
const TestoMonial = () => {
    const reviews =[
        {
            _id:1,
            name:'winson Herry',
            review:'Good services',
            img:people1
        },
        {
            _id:2,
            name:'Winson Herry',
            review:'Doctors behaviour was so nice during the treatment',
            img:people2
        },
        {
            _id:3,
            name:'Winson Herry',
            review:'Good place for treatment',
            img:people3
        }
    ]
    return (
        <section className='px-12 mt-20 dark:bg-black   dark:text-white'>
            <div className='flex justify-between'>
              <div><h4 className='text-xl text-secondary font-bold'>Testimonial</h4>
              <h3 className='text-3xl font-normal'>What Our Patients Says</h3>
              </div>
              
              <div>
               <img  className='w-28 lg:w-48 h-40' src={qoute} alt="" />
              </div>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-1 gap-5'>
                {
                    reviews.map(rw=><Reviews
                    key={rw._id}
                    rw={rw}
                    ></Reviews>)
                }
            </div>
        </section>
    );
};

export default TestoMonial;