import React from 'react';
import { NavLink, Outlet, } from 'react-router-dom';
import useUser from '../useHook/useUser/useUser';
import useRole from '../useHook/useRole/useRole';

const Dashboard = () => {

    const student = <>
        <NavLink>My Selected Class</NavLink>
        <NavLink>My Enroled Class</NavLink>
        <NavLink>My Payment History</NavLink>
    </>

    const instractor = <>
        <NavLink>Add Class</NavLink>
        <NavLink>My Class</NavLink>
    </>
    const admin = <>
        <NavLink to="/dashboard/manage_user" className={({ isActive }) => `${isActive ? 'bg-gray-300 p-3 rounded-e-3xl' : ''}`}>Manage Users</NavLink>
        <NavLink>Manage Class</NavLink>
    </>
    // 
    const { data, refetch, isLoading } = useRole()

    // console.log(data);
    return (
        <div className='max-w-screen-xl mx-auto'>
            {isLoading ? <></> : <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content flex flex-col gap-5">
                        <h1 className='text-2xl font-semibold border-b-2 pb-7 mb-4'>SHIKHO NIO</h1>
                        {/* Sidebar content here */}
                        {data?.role === 'student' && student}
                        {data?.role === 'instractor' && instractor}
                        {data?.role === 'admin' && admin}
                        {/* {admin} */}
                        <hr className='my-4 p-1' />
                    </ul>
                </div>
            </div>}
        </div>
    );
};

export default Dashboard;