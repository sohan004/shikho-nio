import React from 'react';
import useCart from '../../useHook/useCart/useCart';
import { BsArrowBarRight, BsCurrencyExchange, BsFillEmojiLaughingFill, BsTrash3Fill } from "react-icons/bs";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const SelectedClass = () => {
    const { data, refetch } = useCart()
    console.log(data);
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
                fetch(`http://localhost:5000/carts/${c._id}`, {
                    method: 'delete'
                })
                    .then(res => res.json())
                    .then(resData => {
                        if (resData.deletedCount > 0) {
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
            {data.length === 0 ?
            <div className='flex justify-center items-center flex-col gap-4'>
                <h1 className='text-2xl flex items-center gap-2'>No Class Added <BsFillEmojiLaughingFill></BsFillEmojiLaughingFill></h1>
               <Link to="/classes"> <button className="btn btn-outline">Go To Classes Page <BsArrowBarRight className='text-lg'/></button></Link>
            </div> :<div className="overflow-auto w-full">
                <table className="table w-full overflow-auto">
                    {/* head */}
                    <thead>
                        <tr>
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
                            <td><button className="btn btn-primary"><BsCurrencyExchange className='text-lg'/> payment</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>}
        </div>
    );
};

export default SelectedClass;