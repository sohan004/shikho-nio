import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaBeer, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gif from '../../assets/googlevsprivacy.gif'
import { AuthContex } from '../AuthProvider/AuthProvider';
import { GridLoader } from 'react-spinners';
import useTitle from '../useHook/useTitle/useTitle';

const SignIn = () => {
    useTitle('sign in')
    const loc = useLocation()
    const [tf, setTf] = useState(true)
    const [loading, setLoading] = useState(true)
    const { signIn, google, jwt, tf: them } = useContext(AuthContex)
    const [eror, setEror] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const submit = data => {
        setLoading(false)
        signIn(data.email, data.pass)
            .then(result => {
                const userInfo = { name: result?.user?.displayName, email: result?.user?.email, role: 'student', img: result?.user?.photoURL }
                jwt(userInfo)
                    .then(res => res.json())
                    .then(resData => {
                        if (resData.token) {
                            localStorage.setItem('user-token', resData.token)
                            setEror('')
                            navigate(loc?.state ? loc.state : '/')
                        }
                    })
            })
            .catch(err => {
                setEror(err.message)
                setLoading(true)
            })
    }

    const ggl = () => {
        google()
            .then(result => {
                const userInfo = { name: result?.user?.displayName, email: result?.user?.email, role: 'student', img: result?.user?.photoURL }
                fetch('https://assignment-12-server-seven-virid.vercel.app/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then(() => {
                        jwt(userInfo)
                            .then(res => res.json())
                            .then(resData => {
                                if (resData.token) {
                                    localStorage.setItem('user-token', resData.token)
                                    setEror('')
                                    navigate(loc?.state ? loc.state : '/')
                                }
                            })
                    })
            })
            .catch(err => {

                setEror(err.message)
                setLoading(true)
            })
    }

    return (
        <div className='max-w-screen-xl mx-auto shadow-lg'>
            <div className={` flex flex-col-reverse gap-4 md:flex-row items-center py-11 ${them? 'bg-slate-100 text-black': 'bg-gray-800 text-gray-400'}  px-6`}>
                <div className='w-full md:w-6/12'>
                    <img src={gif} className='w-100' alt="" />
                </div>
                <div className='w-full md:w-6/12'>
                    {loading ? <div>
                        <h3 className='text-center font-semibold text-2xl my-3'>Log In</h3>
                        <form onSubmit={handleSubmit(submit)}>
                            <p className='font-medium mb-2'>Email</p>
                            <input  {...register("email", { required: true })} placeholder='type email' type="email" name="email" className='border w-full p-3 rounded-md' />
                            {errors.email?.type === 'required' && <p className='text-red-600'> email is required</p>}
                            <p className='font-medium  mt-5 mb-2'>password</p>
                            <div className='relative'>
                                <input  {...register("pass", { required: true })} placeholder='type password' type={tf ? 'password' : 'text'} name="pass" className='border w-full p-3 rounded-md' />
                                {errors.pass?.type === 'required' && <p className='text-red-600'> password is required</p>}
                                {tf ? <FaEyeSlash onClick={() => setTf(!tf)} className='absolute right-4 top-4 text-xl cursor-pointer' /> : <FaEye onClick={() => setTf(!tf)} className='absolute right-4 top-4 text-xl cursor-pointer' />}
                            </div>
                            <p className='text-red-600'>{eror}</p>
                            <button className="btn btn-primary w-full mt-6">Log in</button>
                        </form>
                        <Link to="/sign_up"><p className='text-center my-6 '>New here? Create a New Account</p></Link>
                        <p className='text-center'>or sign with</p>
                        <div className='text-center mt-3'>
                            <button onClick={ggl} className={`btn  ${them && 'btn-outline'}`}>Google</button>
                        </div>
                    </div> : <div className='flex justify-center my-5'>
                        <GridLoader color="#36d7b7" />
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default SignIn;