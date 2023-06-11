import React, { useContext, useEffect, useState } from 'react';
import { AuthContex } from '../../AuthProvider/AuthProvider';
import { FaBook } from 'react-icons/fa';
import useAxios from '../../useHook/useAxios/useAxios';

const EnrollClass = () => {
    const { user } = useContext(AuthContex)
    const [data, setData] = useState([])
    const axios = useAxios()
    useEffect(() => {
        axios.get(`/enroll/${user?.email}`)
            .then(resData => setData(resData.data))
    }, [user])
    return (
        <div>
            {data.length === 0 ?
                <h1 className=' pb-3 text-center text-lg md:text-2xl my-4 flex items-center justify-center gap-2'>You are not enrolled in any class</h1>
                : <div>
                    <h1 className='border-b-2 pb-3 text-center text-lg md:text-2xl my-4 mb-8 flex items-center justify-center gap-2'><FaBook className='text-2xl' /> Enrolled Class</h1>
                    <div className="overflow-x-auto bg-cyan-800 shadow-2xl p-4 rounded-2xl">
                        <table className="table text-white">
                            {/* head */}
                            <thead>
                                <tr className='text-white'>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((d, i) => <tr key={d._id}>
                                    <th>{i + 1}</th>
                                    <td><img src={d.classImg} className='w-16 rounded-2xl' alt="" /></td>
                                    <td>{d.className}</td>
                                    <td>${d.price}</td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>}
        </div>
    );
};

export default EnrollClass;