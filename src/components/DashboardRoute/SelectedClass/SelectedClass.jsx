import React from 'react';
import useCart from '../../useHook/useCart/useCart';
import { BsArrowBarRight, BsCurrencyExchange, BsFillEmojiLaughingFill, BsTrash3Fill } from "react-icons/bs";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { FaCartPlus, FaRegMoneyBillAlt } from 'react-icons/fa';
import useAxios from '../../useHook/useAxios/useAxios';

const SelectedClass = () => {
    const { data, refetch, isLoading } = useCart()
    const axios = useAxios()
    const delet = c => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://assignment-12-server-seven-virid.vercel.app/carts/${c._id}`)
                    .then(resData => {
                        if (resData.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your class has been deleted.',
                                'success'
                            )

                        }
                    })
            }
        })
    }
    return (
        <div>
            {isLoading ? <div className='flex justify-center my-5'>
                <GridLoader color="#36d7b7" />
            </div> :
                <div>
                    {data.length === 0 ?
                        <div className='text-center'>
                            <h1 className=' pb-3 text-center text-lg md:text-2xl my-4 flex items-center justify-center gap-2'>No Selected Class Available</h1>
                            <Link to="/classes"><button className="btn btn-outline">Go to classes page</button></Link>
                        </div>

                        : <div>
                            <h1 className='border-b-2 pb-3 text-center text-lg md:text-2xl my-4 mb-8 flex items-center justify-center gap-2'><FaCartPlus className='text-2xl' /> Selected Class</h1>
                            <div className="overflow-x-auto bg-cyan-800 text-white shadow-2xl p-4 rounded-2xl">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className='text-white'>
                                            <th>#</th>
                                            <th>class image</th>
                                            <th>class Name</th>
                                            <th>Price</th>
                                            <th>delete</th>
                                            <th>Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((d, i) => <tr key={d._id}>
                                            <th>{i + 1}</th>
                                            <td><img src={d.classImg} className='w-14 rounded-lg' alt="" /></td>
                                            <td>{d.className}</td>
                                            <td>${d.price}</td>
                                            <td><button onClick={() => delet(d)} className="btn btn-error "><BsTrash3Fill className='text-xl'></BsTrash3Fill></button></td>
                                            <td><Link to={`/dashboard/pay/${d._id}`}><button className="btn btn-warning"><BsCurrencyExchange className='text-lg' /> payment</button></Link></td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>}
                </div>
            }
        </div>
    );
};

export default SelectedClass;
