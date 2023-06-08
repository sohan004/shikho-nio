import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const MyClassUpdate = () => {
    const data = useLoaderData()
    const [tf, setTf] = useState(true)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    // console.log(data);
    const submit = inputData => {
        setTf(false)
        const classInfo = {
            className: inputData.className,
            seat: inputData.seat,
            price: inputData.price,
        }
        fetch(`http://localhost:5000/class_details/${data._id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(classInfo)
        })
            .then(res => res.json())
            .then(resData => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Update Successfully',
                    showConfirmButton: false,
                    timer: 2000
                })
                setTf(true)
            })
    }
    return (
        <form action="" onSubmit={handleSubmit(submit)}>
            {tf ? <div className='grid grid-cols-2 gap-5 rounded-md p-5 shadow-2xl'>
                <div className='col-span-2'>
                    <p className='mb-1'>Class Name:</p>
                    <input
                        defaultValue={data.className}
                        {...register('className', { required: true })}
                        type='text'
                        name='className'
                        className='border w-full px-4 shadow py-3 rounded'
                    />
                    {errors.className && (
                        <p className='text-red-600'>className  is required</p>
                    )}
                </div>
                <div>
                    <p className='mb-1'>Available Seat:</p>
                    <input
                        defaultValue={data.seat}
                        {...register('seat', { required: true })}
                        type='number'
                        name='seat'
                        className='border w-full px-4 shadow py-3 rounded'
                    />
                    {errors.seat && (
                        <p className='text-red-600'>seat is required</p>
                    )}
                </div>
                <div>
                    <p className='mb-1'>Price:</p>
                    <input
                        defaultValue={data.price}
                        {...register('price', { required: true })}
                        type='number'
                        name='price'
                        className='border w-full px-4 shadow py-3 rounded'
                    />
                    {errors.price && (
                        <p className='text-red-600'>price is required</p>
                    )}
                </div>
                <button className="btn btn-primary col-span-2 w-full">UPDATE</button>
            </div> : <div className='flex justify-center my-5'>
                <GridLoader color="#36d7b7" />
            </div>}
        </form>
    );
};

export default MyClassUpdate;