import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoaderData } from 'react-router-dom';
import { FaMoneyCheckAlt, FaReceipt, FaRegMoneyBillAlt } from "react-icons/fa";

const stripePromise = loadStripe(`${import.meta.env.VITE_stripe}`);

const Payment = () => {
    const data = useLoaderData()
    return (
        <div className='bg-slate-200 p-7 shadow-inner '>
            <div className='bg-cyan-900 text-white p-5'>
                <h1 className='text-lg md:text-2xl mb-3 flex items-center gap-2'><span className='font-bold'><FaReceipt /></span> {data.className}</h1>
                <div className='flex'>
                    <h1 className='text-lg flex items-center gap-2 bg-red-500 py-1 px-3 rounded-full'><FaRegMoneyBillAlt /> ${data.price}</h1>
                </div>

            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    price={data.price}
                    id={data._id}
                    classId={data.classId}
                    enroll={data.totalEnroll}
                    seat={data.availableSeat}
                    instractor={data.instractorEmail}
                ></CheckoutForm>
                <ToastContainer />
            </Elements>
        </div>
    );
};

export default Payment;