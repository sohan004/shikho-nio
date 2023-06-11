import React from 'react';
import useUser from '../../useHook/useUser/useUser';
import Swal from 'sweetalert2';
import useAxios from '../../useHook/useAxios/useAxios';

const ManageUser = () => {
    const { data, refetch } = useUser()
    const axios = useAxios()

    // const alert = async (d) => {
    //     const { value: fruit } = await Swal.fire({
    //         title: "Do you want to change this user's role?",
    //         input: 'select',
    //         inputOptions: {
    //             'Role': {
    //                 Admin: 'Admin',
    //                 Student: 'Student',
    //                 instractor: 'instractor',
    //             },
    //         },
    //         inputPlaceholder: 'Select a Role',
    //         showCancelButton: true,
    //         inputValidator: (value) => {
    //             return new Promise((resolve) => {
    //                 if (value === '') {
    //                     return Swal.close()
    //                 }
    //                 Swal.fire({
    //                     title: 'Are you sure?',
    //                     text: `Do you want to make this user an ${value}?`,
    //                     icon: 'warning',
    //                     showCancelButton: true,
    //                     confirmButtonColor: '#3085d6',
    //                     cancelButtonColor: '#d33',
    //                     confirmButtonText: 'Yes!'
    //                 }).then((result) => {

    //                     if (result.isConfirmed) {
    //                         fetch(`http://localhost:5000/users/${d._id}`, {
    //                             method: 'PATCH',
    //                             headers: { 'content-type': 'application/json' },
    //                             body: JSON.stringify({ role: value.toLowerCase() })
    //                         })
    //                             .then(res => res.json())
    //                             .then(uData => {
    //                                 if (uData.modifiedCount > 0) {
    //                                     Swal.fire(
    //                                         'User Role Update Successfully',
    //                                         '',
    //                                         'success'
    //                                     )
    //                                     refetch()
    //                                 }
    //                             })
    //                     }
    //                 })
    //             })
    //         }
    //     })
    // }

    const roleCng = (role, d) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to make this user an ${role}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put(`/users/${d._id}`, { role: role.toLowerCase(), enroll: 0 })
                    .then(uData => {
                        if (uData.data.modifiedCount > 0) {
                            Swal.fire(
                                'User Role Update Successfully',
                                '',
                                'success'
                            )
                            refetch()
                        }
                    })
            }
        })
    }
    return (
        <div className="overflow-x-auto">
            <table className="table ">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>current role</th>
                        <th>change role</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => <tr key={d._id}>
                        <th>{i + 1}</th>
                        <td>{d.name}</td>
                        <td>{d.email}</td>
                        <td>{d.role}</td>
                        <td><button onClick={() => roleCng('admin', d)} disabled={d.role === 'admin' || d.role === 'instractor'} className="btn btn-error">Make Admin</button></td>
                        <td><button onClick={() => roleCng('instractor', d)} disabled={d.role === 'instractor' || d.role === 'admin'} className="btn btn-primary">Make instractor</button></td>
                        {/* <td><button onClick={() => alert(d)} className={`btn ${d.role === "admin" ? 'btn-error' : 'btn-primary'}`}>{d.role}</button></td> */}
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUser;