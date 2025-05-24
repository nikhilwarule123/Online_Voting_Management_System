import React, { useState } from 'react';
import { registerUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        contactno: '',
        email: '',
        password: '',
        role: 'user'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            alert("Registration successful!");
            navigate('/login');
        } catch (error) {
            alert("Error during registration: " + error.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.overlay}>
                <h1 style={styles.title}>Voting Registration</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required style={styles.input} />
                    <input type="text" name="contactno" placeholder="Contact No" onChange={handleChange} required style={styles.input} />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
                    <select name="role" onChange={handleChange} style={styles.input}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" style={styles.button}>Register</button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        backgroundImage: 'url("/img/vote6.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
    },
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0,0,0,0.3)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
        color: '#0072ff',
        fontSize: '2.5rem',
        fontWeight: 'bold',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#0072ff',
        color: 'white',
        border: 'none',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    }
};

export default Register;
