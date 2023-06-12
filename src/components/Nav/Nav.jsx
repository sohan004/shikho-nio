import React, { useContext } from 'react';
import blank from '../../assets/blank-profile-picture-gb085c28e0_1280.png'
import { AuthContex } from '../AuthProvider/AuthProvider';
import { Link, NavLink } from 'react-router-dom';
import { FaMoon, FaSun } from "react-icons/fa";
import logo from '../../assets/logo.png'

const Nav = () => {

    const { user, out, tf, setTf } = useContext(AuthContex)
    const userImage = user?.photoURL || blank
    const navItem = <>
        <NavLink to='/' className={({ isActive }) => `text-base font-semibold cursor-pointer duration-500 px-4 rounded ${isActive ? tf ? 'border-b-4 border-white' : 'border-b-4 border-black' : ''}`}>Home</NavLink>
        <NavLink to='/classes' className={({ isActive }) => `text-base font-semibold cursor-pointer duration-500 px-4 rounded ${isActive ? tf ? 'border-b-4 border-white' : 'border-b-4 border-black' : ''}`}>Classes</NavLink>
        <NavLink to='/instractor' className={({ isActive }) => `text-base font-semibold cursor-pointer duration-500 px-4 rounded ${isActive ? tf ? 'border-b-4 border-white' : 'border-b-4 border-black' : ''}`}>Instructors</NavLink>
        {user && <NavLink to='/dashboard/welcome' className={({ isActive }) => `text-base font-semibold cursor-pointer duration-500 px-4 rounded ${isActive ? tf ? 'border-b-4 border-white' : 'border-b-4 border-black' : ''}`}>Dashboard</NavLink>}
    </>
    const themBlack = () => {
        localStorage.setItem('them', true)
        setTf(false)
    }
    const themWhite = () => {
        localStorage.setItem('them', false)
        setTf(true)
    }
    return (
        <div className={`navbar ${tf ? 'text-white from-stone-400  to-stone-900' : 'text-black from-stone-400  to-stone-50'}  my-2 bg-gradient-to-br  rounded-full sticky top-0 z-50`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className={`menu z-10  menu-sm dropdown-content flex flex-col gap-3 mt-3 p-3 shadow  ${tf ? 'from-stone-400  to-stone-900  bg-gradient-to-br' : 'bg-zinc-300'} my-2 rounded-box w-52`}>
                        {navItem}
                    </ul>
                </div>
                <div className='flex items-center gap-1'>
                    <img src={logo} className='w-9 md:w-14' alt="" />
                    <h1 className=' text-sm md:text-2xl font-bold md:px-3'>SHIKHO NIO</h1>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal flex gap-5 px-1">
                    {navItem}
                </ul>
            </div>

            <div className="navbar-end ">
                {tf ? <FaMoon onClick={() => themBlack()} className='me-3 text-xl cursor-pointer' /> : <FaSun onClick={() => themWhite()} className='me-3 text-xl cursor-pointer' />}
                {user ? <button onClick={() => out()} className="btn btn-sm me-2 btn-error">Log Out</button> : <Link to="/sign_in"><button className="btn btn-sm me-2 btn-error">Log in</button></Link>}
                <img src={userImage} className='w-8 h-8  cursor-pointer rounded-full' alt="" />
            </div>
        </div>
    );
};

export default Nav;