import React from 'react';
import './Sec4.css'
import { useContext } from 'react';
import { AuthContex } from '../../AuthProvider/AuthProvider';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';



const Sec4 = () => {
    useEffect(()=>{
        Aos.init({duration: 2000})
    },[])
    const { tf } = useContext(AuthContex)
    return (
        <div className='mt-20'>
            <div className={`${tf? 'text-black': 'text-white'}`}>
                <h1 className='text-center text-2xl'>Shikho Nio Students saying</h1>
                <h1 className='text-center text-xs mt-2 mb-7'>Explore our customer reviews</h1>
            </div>
            <div className="dark:bg-gray-800 dark:text-gray-50">
                <div className="container grid grid-cols-12 mx-auto">
                    <div data-aos='fade-right' className="flex flex-col  justify-center col-span-12 align-middle bg-no-repeat bg-cover dark:bg-gray-700 lg:col-span-6 lg:h-auto ">
                        <div className="flex flex-col items-center p-8 py-12 text-center">
                            <img src="https://i.ibb.co/wWKbKTP/developer-5-star-profile-review-flat-design-vector.jpg" className='w-full' alt="" />
                        </div>
                    </div>
                    <div data-aos='fade-down' className={`flex ${tf ? 'text-black': 'text-white'} flex-col col-span-12 p-6 divide-y lg:col-span-6 lg:p-10`}>

                        <div className="pt-6 pb-4 space-y-2">
                            <span>3 April</span>
                            <h1 className="text-3xl font-bold">Rahul</h1>
                            <p>The courses offered on LearningWebsite2 are of the highest quality. The platform collaborates with top-notch instructors and subject matter experts to deliver well-researched and up-to-date content. The courses cover a wide range of topics, ensuring that learners can find exactly what they are looking for.</p>
                        </div>
                        <div className="pt-6 pb-4 space-y-2">
                            <span>1 March</span>
                            <h1 className="text-3xl font-bold">Sohan</h1>
                            <p>I recently had the opportunity to explore LearningWebsite2, and I must say it has been an impressive experience. This online learning platform offers a wide range of courses and resources to enhance one's knowledge in various fields. Here are a few highlights of my experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sec4;