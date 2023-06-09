import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaBeer, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import gif from '../../assets/googlevsprivacy.gif'
import { AuthContex } from '../AuthProvider/AuthProvider';
import { GridLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const SignUp = () => {
    const [tf, setTf] = useState(true)
    const [tf2, setTf2] = useState(true)
    const { signUp, updt, out } = useContext(AuthContex)
    const [loading, setLoading] = useState(true)
    const [eror, setEror] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const submit = data => {
        if (data.pass != data.pass2) {
            return setEror('password and confirm password not same')
        }
        setLoading(false)

        const img = data.img[0]
        const formData = new FormData()
        formData.append('image', img)
        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img}`, {
            method: 'post',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // console.log(imgData.data.display_url);
                signUp(data.email, data.pass)
                    .then(result => {
                        updt(result.user, data.name, imgData.data.display_url)
                            .then(updtData => {
                                const userInfo = { name: result.user.displayName, email: result.user.email, role: 'student' }
                                fetch('http://localhost:5000/users', {
                                    method: 'POST',
                                    headers: { 'content-type': 'application/json' },
                                    body: JSON.stringify(userInfo)
                                })
                                    .then(res => res.json())
                                    .then(userUpdateData => {
                                        out()
                                            .then(() => {
                                                Swal.fire(
                                                    'Account create successfully',
                                                    'Now go to log in your account',
                                                    'success'
                                                )
                                                navigate('/sign_in')
                                            })
                                    })
                            })
                            .catch(err => {
                                setLoading(true)
                            })
                            .catch(() => {
                                setLoading(true)

                            })
                    })
                    .catch(err => {
                        setEror(err.message)
                        setLoading(true)
                    })
            })
    }

    return (
        <div className='max-w-screen-xl mx-auto shadow-lg'>
            <div className='flex flex-col-reverse gap-4 md:flex-row items-center py-11  bg-slate-100  px-6'>
                <div className='w-full md:w-6/12'>
                    <img src={gif} className='w-100' alt="" />
                </div>
                <div className='w-full md:w-6/12'>
                    {loading ? <div>
                        <h3 className='text-center font-semibold text-2xl my-3'>Register</h3>
                        <form onSubmit={handleSubmit(submit)}>
                            <p className='font-medium mb-2'>Name</p>
                            <input  {...register("name", { required: true })} placeholder='type name' type="text" name='name' className='border w-full p-3 rounded-md' />
                            {errors.name?.type === 'required' && <p className='text-red-600'> name is required</p>}


                            <p className='font-medium mt-5'>Email</p>
                            <input  {...register("email", { required: true })} placeholder='type email' type="email" name="email" className='border w-full p-3 rounded-md' />
                            {errors.email?.type === 'required' && <p className='text-red-600'> email is required</p>}

                            <p className='font-medium mt-5'>image</p>
                            <input {...register("img", { required: true })} type="file" name='img' className="file-input file-input-bordered w-full " />
                            {errors.img?.type === 'required' && <p className='text-red-600'> image is required</p>}

                            <p className='font-medium  mt-5 mb-2'>password</p>
                            <div className='relative'>
                                <input  {...register("pass", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$*])/ })} placeholder='type password' type={tf ? 'password' : 'text'} name="pass" className='border w-full p-3 rounded-md' />
                                {errors.pass?.type === 'required' && <p className='text-red-600'> password is required</p>}
                                {errors.pass?.type === 'pattern' && <p className='text-red-600'> password must be 1 uppercase and 1 spacial carecter</p>}
                                {errors.pass?.type === 'minLength' && <p className='text-red-600'> password must be 6 carecter</p>}
                                {tf ? <FaEyeSlash onClick={() => setTf(!tf)} className='absolute right-4 top-4 text-xl cursor-pointer' /> : <FaEye onClick={() => setTf(!tf)} className='absolute right-4 top-4 text-xl cursor-pointer' />}
                            </div>

                            <p className='font-medium  mt-5 mb-2'>confirm password</p>
                            <div className='relative'>
                                <input  {...register("pass2", { required: true })} placeholder='type password' type={tf2 ? 'password' : 'text'} name="pass2" className='border w-full p-3 rounded-md' />
                                {errors.pass2?.type === 'required' && <p className='text-red-600'> password is required</p>}
                                {tf2 ? <FaEyeSlash onClick={() => setTf2(!tf2)} className='absolute right-4 top-4 text-xl cursor-pointer' /> : <FaEye onClick={() => setTf2(!tf2)} className='absolute right-4 top-4 text-xl cursor-pointer' />}
                            </div>
                            <p className='text-red-600'>{eror}</p>

                            <button className="btn btn-primary w-full mt-6">sign up</button>
                        </form>
                        <Link to="/sign_in"><p className='text-center my-6 text-slate-950'>Alredy you have account? sign in</p></Link>
                    </div> : <div className='flex justify-center my-5'>
                        <GridLoader color="#36d7b7" />
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default SignUp;