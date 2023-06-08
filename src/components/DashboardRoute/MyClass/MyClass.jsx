import React from 'react';
import useClass from '../../useHook/useClass/useClass';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';

const MyClass = () => {
    const { data } = useClass()
    const navigate = useNavigate()
    const fedback = f => {
        Swal.fire(
            'Admin Feedback!',
            f,
            ''
        )
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>status</th>
                            <th>Total Enroled</th>
                            <th>Feedback</th>
                            <th>update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) => <tr key={d._id}>
                            <th>{i + 1}</th>
                            <th>{d.className}</th>
                            <td><button className={`btn btn-xs ${d.status === 'approved' && 'btn-accent'} ${d.status === 'denied' && 'btn-secondary'} ${d.status === 'pending' && 'btn-primary'}`}>{d.status}</button></td>
                            <td>{d.enroll}</td>
                            <td><button onClick={() => fedback(d.feedback.length === 0 ? 'Admin has not given any feedback' : d.feedback)} className="btn btn-neutral btn-sm">Feedback</button></td>
                            <td><NavLink to={`/dashboard/class_update/${d._id}`}><button className="btn btn-error btn-sm">Update</button></NavLink></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
        // <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-5 lg:mx-6'>
        //     {data.map(d =>
        //         <div key={d._id} className="card w-full bg-base-100 shadow-xl">
        //             <figure><img src={d.classImg} /></figure>
        //             <div className="card-body">
        //                 <h2 className="card-title">
        //                     {d.className}
        //                     <div className={`badge ${d.status === 'approved' && 'badge-accent'} ${d.status === 'denied' && 'badge-secondary'} ${d.status === 'pending' && 'badge-primary'} `}>{d.status}</div>
        //                 </h2>
        //                 <p ><span className='font-medium'>Total Enrolled: </span>{d.enroll}</p>

        //             </div>
        //         </div>
        //     )}
        // </div>
    );
};

export default MyClass;