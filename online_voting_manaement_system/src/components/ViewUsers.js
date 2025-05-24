import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewUsers.css';

const ViewUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    //back end feach the data
    const fetchPendingUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/userss/findall');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    //user update data
    const updateUserStatus = async (id, status) => {
        try {
            await axios.put('http://localhost:8080/userss/updatestatus', { id, status });
            fetchPendingUsers();
            //update data feach
        } catch (error) {
            console.error(`Error updating status to ${status}`, error);
        }
    };

    return (
        <div className="custom-container">
            <h2>Pending Users</h2>
            {users.length === 0 ? (
                <p>No pending users found.</p>
            ) : (
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.contactno}</td>
                                <td>{user.role}</td>
                                <td>{user.status}</td>
                                <td>
                                    <button
                                        className="approve-btn"
                                        onClick={() => updateUserStatus(user.id, 'approved')}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="reject-btn"
                                        onClick={() => updateUserStatus(user.id, 'rejected')}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewUsers;
