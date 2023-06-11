import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContex } from '../../AuthProvider/AuthProvider';


const useAxios = () => {
    const { out } = useContext(AuthContex);
    const navigate = useNavigate();

    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000',
    });

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('user-token');
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Your session expired',
                    })
                    await out();
                    navigate('/sign_in');
                }
                return Promise.reject(error);
            }
        );
    }, [out, navigate, axiosSecure]);

    return axiosSecure;
};

export default useAxios;

// const useAxiosSecure = () =>{

// }
// return useAxiosSecure