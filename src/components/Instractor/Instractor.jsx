import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Instractor = () => {
    const data = useLoaderData()
    console.log(data);
    return (
        <div className='grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9'>
            {data.map(d=><div key={d._id} className="card w-full bg-base-100 shadow-xl border">
                <div className="card-body">
                    <h2 className="card-title">{d.name}</h2>
                    <p><span className='font-semibold'>Email:</span> {d.email}</p>
                </div>
                <figure><img src={d.img} className='w-full' alt="Shoes" /></figure>
            </div>)}
        </div>
    );
};

export default Instractor;