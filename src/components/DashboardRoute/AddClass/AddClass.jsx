import React, { useContext, useState } from 'react';
import { AuthContex } from '../../AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { GridLoader } from 'react-spinners';

const AddClass = () => {
    const { user } = useContext(AuthContex)
    const [tf, setTf] = useState(true)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const addInput = (inputData) => {
        setTf(false)
        const img = inputData.classImage[0]
        const formData = new FormData()
        formData.append('image', img)
        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                const classInfo = {
                    className: inputData.className,
                    classImg: imgData.data.display_url,
                    name: inputData.instructorName,
                    email: inputData.instructorEmail,
                    seat: +inputData.availableSeat,
                    price: +inputData.price,
                    enroll: 0,
                    status: 'pending',
                    feedback: ''
                }
                fetch('http://localhost:5000/class', {
                    method: 'post',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(classInfo)
                })
                    .then(res => res.json())
                    .then(insert => {
                        if (insert.insertedId) {
                            Swal.fire(
                                'class added',
                                'your class added successfully',
                                'success'
                            )
                            reset()
                            setTf(true)
                        }
                    })
            })

    };
    return (
        <div>
            <h1 className='text-2xl text-center mb-7 border-b-2 pb-3'>Add Class</h1>
            {tf ? <form onSubmit={handleSubmit(addInput)}>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='col-span-2 md:col-span-1'>
                        <p className='mb-1'>Class Name:</p>
                        <input
                            {...register('className', { required: true })}
                            type='text'
                            name='className'
                            className='border w-full px-4 shadow py-3 rounded'
                        />
                        {errors.className && (
                            <p className='text-red-600'>Class name is required</p>
                        )}
                    </div>

                    <div className='col-span-2 md:col-span-1'>
                        <p className='mb-1'>Class Image:</p>
                        <input
                            type='file'
                            name='classImage'
                            {...register('classImage', { required: true })}
                            className='file-input file-input-bordered w-full'
                        />
                        {errors.classImage && (
                            <p className='text-red-600'>Class image is required</p>
                        )}
                    </div>

                    <div className='col-span-2 md:col-span-1'>
                        <p className='mb-1'>Instructor Name:</p>
                        <input
                            value={user?.displayName}

                            {...register('instructorName', { required: true })}
                            type='text'
                            name='instructorName'
                            className='border w-full px-4 shadow py-3 rounded'
                        />
                        {errors.instructorName && (
                            <p className='text-red-600'>Instructor name is required</p>
                        )}
                    </div>

                    <div className='col-span-2 md:col-span-1'>
                        <p className='mb-1'>Instructor Email:</p>
                        <input
                            value={user?.email}
                            {...register('instructorEmail', { required: true })}
                            type='email'
                            name='instructorEmail'
                            className='border w-full px-4 shadow py-3 rounded'
                        />
                        {errors.instructorEmail && (
                            <p className='text-red-600'>Instructor email is required</p>
                        )}
                    </div>

                    <div>
                        <p className='mb-1'>Available Seat:</p>
                        <input
                            type='number'
                            {...register('availableSeat', { required: true, min: 10, max: 30 })}
                            name='availableSeat'
                            className='border w-full px-4 shadow py-3 rounded'
                        />
                        {errors.availableSeat?.type === 'required' && (
                            <p className='text-red-600'>Seat is required</p>
                        )}
                        {errors.availableSeat?.type === 'min' && (
                            <p className='text-red-600'>Minimum 10 seats are required</p>
                        )}
                        {errors.availableSeat?.type === 'max' && (
                            <p className='text-red-600'>Only 30 seats can be added</p>
                        )}
                    </div>

                    <div>
                        <p className='mb-1'>Price:</p>
                        <input
                            {...register('price', { required: true, min: 1, max: 100000 })}
                            type='number'
                            name='price'
                            className='border w-full px-4 shadow py-3 rounded'
                        />
                        {errors.price && (
                            <p className='text-red-600'>Price is required</p>
                        )}
                    </div>

                    <button className="btn btn-neutral w-full mt-4 col-span-2">Add Class</button>
                </div>
            </form> : <div className='flex justify-center my-5'>
                <GridLoader color="#36d7b7" />
            </div>}
        </div>
    );
};

export default AddClass;