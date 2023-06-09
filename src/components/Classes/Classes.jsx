import React, { useEffect, useState } from 'react';
import { BsFillCartPlusFill } from "react-icons/bs";
import useRole from '../useHook/useRole/useRole';

const Classes = () => {
    const [classes, setClasses] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/approve_class')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    const { data } = useRole()
    console.log(data);
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-6 lg:gap-9'>
            {classes.map(c =>
                <div key={c._id} className={`card w-full ${+c.seat === 0 ? 'bg-red-200' : 'bg-base-100'}  bg-base-100 shadow-xl`}>
                    <figure><img src={c.classImg} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{c.className}</h2>
                        <div>
                            <h1 className='bg-teal-800 inline p-2 rounded-full text-white'>${c.price}</h1>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h1 className='mt-6'><span className='font-medium'>Instractor Name:</span> {c.name}</h1>
                                    <h1 className=''><span className='font-medium'>Available Seats:</span> {c.seat}</h1>
                                </div>
                                <div>
                                    <button disabled={data?.role !== 'student' || +c.seat === 0} className="btn btn-accent"><BsFillCartPlusFill className='text-xl' /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    );
};

export default Classes;