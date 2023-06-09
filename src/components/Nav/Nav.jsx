import React, { useContext } from 'react';
import blank from '../../assets/blank-profile-picture-gb085c28e0_1280.png'
import { AuthContex } from '../AuthProvider/AuthProvider';
import { Link, NavLink } from 'react-router-dom';

const Nav = () => {
    const { user, out } = useContext(AuthContex)
    const userImage = user?.photoURL || blank
    const navItem = <>
        <NavLink to='/' className={({ isActive }) => `text-base font-semibold cursor-pointer duration-500 px-4 rounded ${isActive ? 'border-b-4': ''}`}>Home</NavLink>
        <NavLink to='/gg' className={({ isActive }) => `text-base font-semibold cursor-pointer duration-500 px-4 rounded ${isActive ? 'border-b-4': ''}`}>Instructors</NavLink>
        <NavLink to='/classes' className={({ isActive }) => `text-base font-semibold cursor-pointer duration-500 px-4 rounded ${isActive ? 'border-b-4': ''}`}>Classes</NavLink>
        <NavLink to='/dashboard' className={({ isActive }) => `text-base font-semibold cursor-pointer duration-500 px-4 rounded ${isActive ? 'border-b-4': ''}`}>Dashboard</NavLink>
    </>
    return (
        <div className="navbar from-stone-400 text-white to-stone-900 my-2 bg-gradient-to-br  rounded-full sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu z-10  menu-sm dropdown-content flex flex-col gap-3 mt-3 p-3 shadow  from-stone-400  to-stone-900 my-2 bg-gradient-to-br rounded-box w-52">
                        {navItem}
                    </ul>
                </div>
                <h1 className=' text-lg md:text-2xl font-bold md:px-3'>SHIKHO NIO</h1>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal flex gap-5 px-1">
                    {navItem}
                </ul>
            </div>

            <div className="navbar-end ">
                {user ? <button onClick={() => out()} className="btn btn-sm me-2 btn-error">Log Out</button> : <Link to="/sign_in"><button className="btn btn-sm me-2 btn-error">Log in</button></Link>}
                <img src={userImage} className='w-8 h-8  cursor-pointer rounded-full' alt="" />
            </div>
        </div>
    );
};

export default Nav;