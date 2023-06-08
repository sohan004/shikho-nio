import React from 'react';
import useAllClass from '../../useHook/useAllClass/useAllClass';
import Swal from 'sweetalert2';

const ManageClass = () => {
    const { data, refetch } = useAllClass()
    const approve = (status, d) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't ${status} this class!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/class_details/${d._id}`, {
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ status: status + 'd' })
                })
                    .then(res => res.json())
                    .then(resData => {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: `class ${status} Successfully`,
                            showConfirmButton: false,
                            timer: 2000
                        })
                        refetch()
                    })
            }
        })
    }

    const feedback = async (d) => {
        const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Feedback',
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })

        if (text) {
            fetch(`http://localhost:5000/class_details/${d._id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ feedback: text })
            })
                .then(res => res.json())
                .then(resData => {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'feedback send successfully',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    refetch()
                })
        }
    }
    return (
        <div>
            <div className="overflow-auto w-full">
                <table className="table w-full overflow-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>class image</th>
                            <th>class Name</th>
                            <th>Instractor Name</th>
                            <th>Instractor email</th>
                            <th>Available seats</th>
                            <th>Price</th>
                            <th>status</th>
                            <th>approve</th>
                            <th>reject</th>
                            <th>feedback</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) => <tr key={d._id}>
                            <th>{i + 1}</th>
                            <td><img src={d.classImg} className='w-14 rounded-lg' alt="" /></td>
                            <td>{d.className}</td>
                            <td>{d.name}</td>
                            <td>{d.email}</td>
                            <td>{d.seat}</td>
                            <td>{d.price} BDT</td>
                            <td><button className={`btn btn-xs ${d.status === 'approved' && 'btn-accent'} ${d.status === 'denied' && 'btn-secondary'} ${d.status === 'pending' && 'btn-primary'}`}>{d.status}</button></td>
                            <td><button onClick={() => approve('approve', d)} disabled={d.status === 'approved' || d.status === 'denied'} className="btn btn-primary btn-sm">Approve</button></td>
                            <td><button onClick={() => approve('denie', d)} disabled={d.status === 'approved' || d.status === 'denied'} className="btn btn-error btn-sm">Reject</button></td>
                            <td><button disabled={d.status === 'pending'} onClick={() => feedback(d)} className="btn btn-neutral btn-sm">Feedback</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClass;