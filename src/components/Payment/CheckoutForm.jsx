import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContex } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ price, id, classId, enroll, seat, instractor }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContex)

    const [clientSecret, setClientSecret] = useState("");
    const [tf, setTf] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: +price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);



    const handleSubmit = async (event) => {
        setTf(false)
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return setTf(true)
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return setTf(true)
        }
        if (!user) {
            setTf(true)
            return toast.error("log in first", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        if (+seat < 1) {
            setTf(true)
            return toast.error("seat not available", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTf(true)
        } else {
            const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            })
            if (paymentError) {
                toast.error(paymentError.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTf(true)
            }
            else {
                if (paymentIntent.status === "succeeded") {

                    fetch(`http://localhost:5000/carts/${id}`, {
                        method: 'put',
                        headers: { 'content-type': 'application/json' }
                    })
                        .then(res => res.json())
                        .then(resData => {
                            if (resData.modifiedCount) {
                                fetch(`http://localhost:5000/class_details/${classId}`, {
                                    method: 'PUT',
                                    headers: { 'content-type': 'application/json' },
                                    body: JSON.stringify({ enroll: +enroll + 1, seat: +seat - 1 })
                                })
                                    .then(res => res.json())
                                    .then(resData2 => {
                                        if (resData2.modifiedCount) {
                                            fetch(`http://localhost:5000/instractor/${instractor}`, {
                                                method: 'PUT',
                                                headers: { 'content-type': 'application/json' },
                                            })
                                                .then(res => res.json())
                                                .then(resData3 => {
                                                    if (resData3.modifiedCount) {
                                                        const info = {
                                                            id: paymentIntent.id,
                                                            email: user?.email,
                                                            date: new Date(),
                                                            price: +paymentIntent.amount / 100
                                                        }
                                                        fetch('http://localhost:5000/payment', {
                                                            method: 'post',
                                                            headers: { 'content-type': 'application/json' },
                                                            body: JSON.stringify(info)
                                                        })
                                                            .then(res => res.json())
                                                            .then(resData => {
                                                                Swal.fire({
                                                                    position: 'top-center',
                                                                    icon: 'success',
                                                                    title: 'Payment Successfully',
                                                                    showConfirmButton: false,
                                                                    timer: 2500
                                                                })
                                                                navigate('/')
                                                                setTf(true)

                                                            })
                                                    }
                                                })
                                        }
                                    })

                            }
                        })
                }
            }
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                className='shadow-md p-3 bg-white'
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className='text-end mt-4'>
                <button className='btn btn-primary btn-sm' disabled={!stripe || !clientSecret || !tf}>
                    Pay
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;