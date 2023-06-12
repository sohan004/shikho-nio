import React from 'react';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import err from '../../assets/200w.gif'

const Error = () => {
    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className='flex gap-5 flex-col md:flex-row'>
                <div className='w-full md:w-6/12'>
                    <section className="flex  items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
                        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                            <div className="max-w-md text-center">
                                <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                                    <span className="sr-only">Error</span>404
                                </h2>
                                <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                                <p className="mt-4 mb-8 dark:text-gray-400">But dont worry, you can find plenty of other things on our homepage.</p>
                                <Link rel="noopener noreferrer" to="/" ><button className="btn btn-neutral">Back to homepage</button></Link>
                            </div>
                        </div>
                    </section>
                </div>
                <div className='w-full md:w-6/12'>
                    <img src={err} className='w-full' alt="" />
                </div>
            </div>
        </div>
    );
};

export default Error;