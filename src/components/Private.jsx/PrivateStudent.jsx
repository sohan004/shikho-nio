import React, { useContext } from 'react';
import { AuthContex } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useRole from '../useHook/useRole/useRole';

const PrivateStudent = ({ children }) => {
    const loc = useLocation()
    const { load, user } = useContext(AuthContex)
    const { data, refetch, isLoading } = useRole()
    if (load || isLoading) {
        return <div className='flex justify-center items-center mt-8'>
            <HashLoader color="#6A6662" />
        </div>
    }
    if (user && data?.role === 'student') {
        return children
    }
    else {
        return <Navigate to="/" state={loc.pathname}></Navigate>
    }
};

export default PrivateStudent;