import React, { useEffect, useState } from 'react';
import useAxios from '../../useHook/useAxios/useAxios';
import { AuthContex } from '../../AuthProvider/AuthProvider';
import { useContext } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';



const Sec3 = () => {
    useEffect(()=>{
        Aos.init({duration: 2000})
    },[])
    const [data, setData] = useState([])
    const axios = useAxios()
    const { tf } = useContext(AuthContex)
    useEffect(() => {
        axios.get('/populer_instractor')
            .then(resData => setData(resData.data))
    }, [])
    return (
        <div className='mt-20'>
            <div className={`${tf ? 'text-black': 'text-white'}`}>
                <h1 className='text-center text-2xl'>Shikho Nio Popular Instractor</h1>
                <h1 className='text-center text-xs mt-2 mb-7'>Explore Our Most Popular Instractor for Personal and Professional Growth</h1>
            </div>
            <div className='grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9'>
                {data.map(d =>
                    <div data-aos='fade-up' key={d._id} className={`flex  ${tf? 'bg-stone-200 text-black' :'bg-gray-800 text-white'} flex-col  justify-center  p-6 shadow rounded-xl sm:px-12`}>
                        <img src={d.img} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                        <div className="space-y-4 text-center divide-y divide-gray-700">
                            <div className="my-2 space-y-1">
                                <h2 className="text-xl mt-4 font-semibold sm:text-2xl">{d.name}</h2>
                                <p className="px-5 text-xs sm:text-base dark:text-gray-400">{d.email}</p>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default Sec3;