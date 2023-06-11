import React, { useContext } from 'react';
import { AuthContex } from '../AuthProvider/AuthProvider';
import { HashLoader } from 'react-spinners';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const loc = useLocation()
    const { load, user } = useContext(AuthContex)
    if (load) {
        return <div className='flex justify-center items-center mt-8'>
            <HashLoader color="#6A6662" />
        </div>
    }
    if (user) {
        return children
    }
    else {
        return <Navigate to="/sign_in" state={loc.pathname}></Navigate>
    }
};

export default PrivateRoute;