import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/caru1.png'
import img2 from '../../../assets/caru2.png'
import img3 from '../../../assets/caru3.png'
import img4 from '../../../assets/caru4.png'

const Sec1 = () => {
    return (
        <div className='relative'>
            <Carousel autoPlay={true} infiniteLoop={true} className='text-center '>
                <div className=''>
                    <img src={img1} className='w-full rounded-3xl' />
                </div>
                <div>
                    <img src={img2} className='w-full rounded-3xl' />
                </div>
                <div>
                    <img src={img3} className='w-full rounded-3xl' />
                </div>
            </Carousel>
            <div className='absolute top-2 md:top-1/3 hidden md:block  lg:top-2/4   glass shadow-2xl px-7 py-3 md:py-14'>
                <h1 className='text-lg md:text-2xl lg:text-4xl mb-1 md:mb-5 font-semibold '>SHIKHO NIO - Explore the World of Language Learning</h1>
                <p className='text-xs md:text-sm'> Shikho Nio, meaning "Learn and Thrive" in Bengali, is your gateway to an immersive language learning experience. Our website is designed to empower learners of all ages and backgrounds to embark on a journey of linguistic discovery. With a diverse range of courses, interactive lessons, and expert guidance, Shikho Nio offers a holistic approach to language acquisition </p>
            </div>
        </div>
    );
};

export default Sec1;