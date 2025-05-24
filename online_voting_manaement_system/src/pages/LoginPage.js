import React, { useState } from 'react';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (user) => {
        if (user.role === 'admin') navigate('/admin');
        else navigate('/user');
    };

    return <Login onLogin={handleLogin} />;
}

export default LoginPage;
