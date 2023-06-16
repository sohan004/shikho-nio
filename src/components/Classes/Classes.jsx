import React, { useContext, useEffect, useState } from 'react';
import { BsFillCartPlusFill } from "react-icons/bs";
import useRole from '../useHook/useRole/useRole';
import { AuthContex } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import useAxios from '../useHook/useAxios/useAxios';
import Aos from 'aos';
import 'aos/dist/aos.css';
import useTitle from '../useHook/useTitle/useTitle';



const Classes = () => {
    useTitle('classes')
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
    const axios = useAxios()
    const [classes, setClasses] = useState([])
    const { user, tf } = useContext(AuthContex)
    const navigate = useNavigate()
    const loc = useLocation()
    useEffect(() => {
        fetch('https://assignment-12-server-seven-virid.vercel.app/approve_class')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    const { data, isLoading } = useRole()
    const addCart = c => {
        if (!user) {
            return Swal.fire({
                title: 'Do you want to do this course?',
                text: "First login then add this course to cart",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/sign_in', { state: loc.pathname })
                }
            })
        }
        const info = {
            classId: c._id,
            className: c.className,
            classImg: c.classImg,
            studentName: user?.displayName,
            studentEmail: user?.email,
            instractorEmail: c.email,
            availableSeat: c.seat,
            price: c.price,
            payment: false,
            totalEnroll: c.enroll,
        }
        axios.post('/carts', info)
            .then(insert => {
                if (insert.data.insertedId) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Add cart successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    return (
        <div>
            {isLoading ? <div className='flex justify-center my-5'>
                <GridLoader color="#36d7b7" />
            </div> : <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-6 lg:gap-9'>
                {classes.map(c =>
                    <div data-aos='fade-up' key={c._id}>
                        <div  className={`card w-full h-full cb ${+c.seat === 0 ? 'bg-red-200' : tf ? 'bg-stone-300 text-black' : 'bg-gray-800 text-white'} border border-blue-950`}>
                            <figure><img src={c.classImg} className='w-full ci duration-300' alt="class" /></figure>
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
                                            <button onClick={() => addCart(c)} disabled={data?.role === 'instractor' || data?.role === 'admin' || +c.seat === 0} className="btn shadow-lg btn-accent"><BsFillCartPlusFill className='text-xl' /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
            </div>}
        </div>
    );
};

export default Classes;