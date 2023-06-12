import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContex } from '../../AuthProvider/AuthProvider';


const useAxios = () => {
    const { out } = useContext(AuthContex);
    const navigate = useNavigate();
    const loc = useLocation()

    const axiosSecure = axios.create({
        baseURL: 'https://assignment-12-server-seven-virid.vercel.app',
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
                    navigate('/sign_in', { state: loc.pathname });
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