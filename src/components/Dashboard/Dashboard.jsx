import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate, useNavigation, } from 'react-router-dom';
import useUser from '../useHook/useUser/useUser';
import useRole from '../useHook/useRole/useRole';
import { AuthContex } from '../AuthProvider/AuthProvider';
import { BsBuildingAdd, BsCurrencyExchange, BsFillCartPlusFill, BsFillCheckCircleFill, BsFillHouseDoorFill, BsFillLayersFill, BsFillPersonFill, BsFillXOctagonFill, BsHouseDoorFill } from "react-icons/bs";
import { GridLoader, HashLoader } from 'react-spinners';

const Dashboard = () => {
    const { user, out } = useContext(AuthContex)
    const navigate = useNavigate()
    const navigation = useNavigation()

    const student = <>
        <NavLink to="/dashboard/selected_class" className={({ isActive }) => `flex items-center gap-2 font-medium ${isActive ? 'bg-gray-200 text-black p-3 rounded-e-3xl' : ''}`}><BsFillCartPlusFill /> My Selected Class</NavLink>
        <NavLink to="/dashboard/enroll_class" className={({ isActive }) => `flex items-center gap-2 font-medium ${isActive ? 'bg-gray-200 text-black p-3 rounded-e-3xl' : ''}`}><BsFillCheckCircleFill /> My Enroled Class</NavLink>
        <NavLink to="/dashboard/payment" className={({ isActive }) => `flex items-center gap-2 font-medium ${isActive ? 'bg-gray-200 text-black p-3 rounded-e-3xl' : ''}`}><BsCurrencyExchange /> My Payment History</NavLink>
        {/* <NavLink>My Selected Class</NavLink>
        <NavLink>My Enroled Class</NavLink>
        <NavLink>My Payment History</NavLink> */}
    </>

    const instractor = <>
        <NavLink to="/dashboard/my_class" className={({ isActive }) => `flex items-center gap-2 font-medium ${isActive ? 'bg-gray-200 text-black p-3 rounded-e-3xl' : ''}`}><BsFillHouseDoorFill /> My Class</NavLink>
        <NavLink to="/dashboard/add_class" className={({ isActive }) => `flex items-center gap-2 font-medium ${isActive ? 'bg-gray-200 text-black p-3 rounded-e-3xl' : ''}`}><BsBuildingAdd /> Add Class</NavLink>
    </>
    const admin = <>
        <NavLink to="/dashboard/manage_user" className={({ isActive }) => `flex items-center gap-2 font-medium ${isActive ? 'bg-gray-200 text-black p-3 rounded-e-3xl' : ''}`}><BsFillPersonFill /> Manage Users</NavLink>
        <NavLink to="/dashboard/manage_class" className={({ isActive }) => `flex items-center gap-2 font-medium ${isActive ? 'bg-gray-200 text-black p-3 rounded-e-3xl' : ''}`}><BsFillLayersFill /> Manage Class</NavLink>
    </>
    // 
    const { data, refetch, isLoading } = useRole()

    // console.log(data);
    return (
        <div className='max-w-screen-xl mx-auto'>
            {isLoading ? <div className='flex justify-center items-center my-5'>
                <GridLoader color="#36d7b7" />
            </div> : <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content p-4 lg:mt-8 overflow-x-auto">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    {navigation.state === 'loading' ? <div className='flex justify-center items-center mt-8'>
                        <HashLoader color="#6A6662" />
                    </div> : <Outlet></Outlet>}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full  text-white ps-7 bg-cyan-900 flex flex-col gap-5">
                        <h1 className='text-2xl font-semibold border-b-2 pb-7 mb-7'>SHIKHO NIO</h1>
                        {/* Sidebar content here */}
                        {data?.role === 'student' && student}
                        {data?.role === 'instractor' && instractor}
                        {data?.role === 'admin' && admin}
                        {/* {admin} */}
                        <hr className='my-6 p-1' />
                        <p className='font-medium cursor-pointer flex items-center gap-2' onClick={() => navigate('/')}><BsHouseDoorFill /> Home</p>
                        <p className='font-medium cursor-pointer flex items-center gap-2' onClick={() => { out(); navigate('/sign_in') }}><BsFillXOctagonFill /> Log Out</p>
                    </ul>
                </div>
            </div>}
        </div>
    );
};

export default Dashboard;