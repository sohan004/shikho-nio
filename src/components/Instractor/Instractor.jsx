import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { AuthContex } from '../AuthProvider/AuthProvider';
import useTitle from '../useHook/useTitle/useTitle';



const Instractor = () => {
    useTitle('instractor')
    const { tf } = useContext(AuthContex)
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
    const data = useLoaderData()
    return (
        <div className='grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9'>
            {data.map(d =>
                <div data-aos='fade-up' key={d._id}>
                    <div   className={`${tf ? 'bg-white text-black' : 'bg-gray-800 text-white'} w-full h-full border p-8 sm:flex sm:space-x-6 shadow-sm`}>
                        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                            <img src={d.img} alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <h2 className="text-2xl font-semibold">{d.name.toUpperCase()}</h2>
                                <span className="text-sm dark:text-gray-400">{d.role.toUpperCase()}</span>
                            </div>
                            <div className="space-y-1">
                                <span className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
                                        <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                                    </svg>
                                    <span className="dark:text-gray-400">{d.email}</span>
                                </span>

                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    );
};

export default Instractor;