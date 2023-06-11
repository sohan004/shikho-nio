import React, { useEffect, useState } from 'react';
import useAxios from '../../useHook/useAxios/useAxios';

const Sec3 = () => {
    const [data, setData] = useState([])
    const axios = useAxios()
    useEffect(() => {
        axios.get('/populer_instractor')
            .then(resData => setData(resData.data))
    }, [])
    return (
        <div className='mt-20'>
            <h1 className='text-center text-2xl'>Shikho Nio Popular Instractor</h1>
            <h1 className='text-center text-xs mt-2 mb-7'>Explore Our Most Popular Instractor for Personal and Professional Growth</h1>
            <div className='grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9'>
                {data.map(d =>
                    <div key={d._id} className="flex flex-col  justify-center  p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
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