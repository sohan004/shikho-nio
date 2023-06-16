import React, { useEffect, useState } from 'react';
import useAxios from '../../useHook/useAxios/useAxios';
import { useContext } from 'react';
import { AuthContex } from '../../AuthProvider/AuthProvider';
import Aos from 'aos';
import 'aos/dist/aos.css';



const Sec2 = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
    const axios = useAxios()
    const [data, setData] = useState([])
    const { tf } = useContext(AuthContex)
    useEffect(() => {
        axios.get('/populer_class')
            .then(resData => setData(resData.data))
    }, [])
    return (
        <div className='mt-14'>
            <div className={`${tf ? 'text-black' : 'text-white'}`}>
                <h1 className='text-center text-2xl'>Shikho Nio Popular Classes</h1>
                <h1 className='text-center text-xs mt-2 mb-7'>Explore Our Most Popular Classes for Personal and Professional Growth</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9'>
                {data.map(d =>
                    <div data-aos='fade-up' key={d._id}>
                        <div  className={`card card-side cb w-full  ${tf ? 'bg-stone-300 text-black' : 'bg-gray-800 text-white'}  border border-slate-800 h-full`}>
                            <figure><img src={d.classImg} alt="class" className='w-full h-full duration-300 ci' /></figure>
                            <div className=" flex  items-center  px-2">
                                <div>
                                    <h2 className="card-title ">{d.className}</h2>
                                    <p>Instractor: {d.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default Sec2;