// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const goToLogin = () => navigate('/login');
    const goToRegister = () => navigate('/register');

    return (
        <div style={styles.container}>
            <div style={styles.overlay}>
                <h1>Welcome to Online Voting System</h1>
                <p>Please login or register to continue.</p>
                <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={goToLogin}>Login</button>
                    <button style={styles.button} onClick={goToRegister}>Register</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: '100vh',                         // पूरा viewport cover होईल
        backgroundImage: 'url("/img/vote.jpg")', // public/img/vote.jpg
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '40px',
        borderRadius: '10px',
        color: 'white',
        textAlign: 'center',
        width: '80%',
        maxWidth: '500px',
    },
    buttonContainer: {
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
    },
};

export default HomePage;
