import React, { useContext, useEffect, useState } from 'react';
import { AuthContex } from '../../AuthProvider/AuthProvider';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import moment from 'moment/moment';
import useAxios from '../../useHook/useAxios/useAxios';

const PayHistory = () => {
    const axios = useAxios()
    const { user } = useContext(AuthContex)
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`/payment/${user?.email}`)
            .then(resData => setData(resData.data))
    }, [user])
    return (
        <div>
            {data.length === 0 ?
                <h1 className=' pb-3 text-center text-lg md:text-2xl my-4 flex items-center justify-center gap-2'>No Payment History Available</h1>
                : <div>
                    <h1 className='border-b-2 pb-3 text-center text-lg md:text-2xl my-4 mb-8 flex items-center justify-center gap-2'><FaRegMoneyBillAlt className='text-2xl' /> Payment History</h1>
                    <div className="overflow-x-auto bg-cyan-800 text-white shadow-2xl p-4 rounded-2xl">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className='text-white'>
                                    <th>#</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((d, i) => <tr key={d._id}>
                                    <th>{i + 1}</th>
                                    <td>${d.price}</td>
                                    <td>{moment(d.date).format('MMMM Do YYYY, h:mm:ss a')}</td>

                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>}
        </div>
    );
};

export default PayHistory;