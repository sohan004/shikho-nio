import React, { useEffect, useState } from 'react';

const Sec2 = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/populer_class')
            .then(res => res.json())
            .then(resData => setData(resData))
    }, [])
    return (
        <div className='mt-14'>
            <h1 className='text-center text-2xl'>Shikho Nio Popular Classes</h1>
            <h1 className='text-center text-xs mt-2 mb-7'>Explore Our Most Popular Classes for Personal and Professional Growth</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9'>
                {data.map(d => <div key={d._id} className="card card-side cb w-full  bg-base-100 shadow-xl border">
                    <figure><img src={d.classImg} alt="class" className='w-full h-full duration-300 ci' /></figure>
                    <div className=" flex  items-center  px-2">
                        <div>
                            <h2 className="card-title ">{d.className}</h2>
                            <p>Instractor: {d.name}</p>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default Sec2;