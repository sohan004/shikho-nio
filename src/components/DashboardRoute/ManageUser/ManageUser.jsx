import React from 'react';
import useUser from '../../useHook/useUser/useUser';

const ManageUser = () => {
    const { data, refetch } = useUser()
    console.log(data);
    return (
        <div className="overflow-x-auto">
            <table className="table ">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>role</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => <tr key={d._id}>
                        <th>{i + 1}</th>
                        <td>{d.name}</td>
                        <td>{d.email}</td>
                        <td><button className={`btn ${d.role === "admin"? 'btn-error': 'btn-primary'}`}>{d.role}</button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUser;