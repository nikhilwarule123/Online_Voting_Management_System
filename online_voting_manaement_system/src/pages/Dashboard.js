import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';

function Dashboard({ user }) {
    return (
        <div>
            {user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
        </div>
    );
}

export default Dashboard;
