// src/services/auth.js

import axios from './api';

// Register user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post('/userss/register', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// बाकीचे exports जर आहेत (loginUser, logout, saveUser), ते तसेच राहू द्या
export const loginUser = async (userData) => {
    try {
        const response = await axios.post('/userss/login', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const logout = () => {
    localStorage.removeItem('user');
};
