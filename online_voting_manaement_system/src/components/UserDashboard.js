import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

function UserDashboard() {
    const [elections, setElections] = useState([]);
    const [selectedElectionId, setSelectedElectionId] = useState('');
    const [page, setPage] = useState('home'); // 'home' or 'election'

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/addelectionc/findall')
            .then(res => res.json())
            .then(data => setElections(data))
            .catch(err => console.error(err));
    }, []);

    const handleFormSubmit = () => {
        if (!selectedElectionId) {
            alert("Please select an election");
            return;
        }
        navigate(`/candidates/${selectedElectionId}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        setPage('home');
        setSelectedElectionId('');
    };

    const handleElectionClick = (e) => {
        e.preventDefault();
        setPage('election');
        setSelectedElectionId('');
    };

    const isBackgroundShown = page === 'home';

    return (
        <div
            className="user-dashboard"
            style={{
                backgroundImage: isBackgroundShown ? "url('/img/vote7.jpg')" : 'none',
                backgroundSize: isBackgroundShown ? 'contain' : 'none', // इमेज medium ठेवते
                backgroundPosition: isBackgroundShown ? 'bottom center' : 'none', // इमेज खालच्या बाजूला
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh', // स्क्रोलिंगसाठी पूर्ण उंची
                height: 'auto',
                color: isBackgroundShown ? 'white' : 'inherit',
                overflowY: 'auto',
                paddingBottom: '50px',
            }}


        >
            <nav className="navbar">
                <ul>
                    <li><a href="#" onClick={handleHomeClick}>HOME</a></li>
                    <li><a href="#" onClick={handleElectionClick}>ELECTION</a></li>
                    <li><a href="#" onClick={handleLogout}>LOGOUT</a></li>
                </ul>
            </nav>

            <div className="banner">ONLINE ELECTION SYSTEM</div>

            {page === 'home' && (
                <div className="home-content">
                    <h2>Welcome to the Online Election System</h2>
                    <p>Select ELECTION from the menu to participate.</p>
                    {/* Add dummy content to demonstrate scroll */}
                    {[...Array(20)].map((_, i) => (
                        <p key={i}>This is some sample content line #{i + 1}</p>
                    ))}
                </div>
            )}

            {page === 'election' && (
                <div className="vote-form">
                    <h2>MLA ELECTION 2025</h2>
                    <select value={selectedElectionId} onChange={(e) => setSelectedElectionId(e.target.value)}>
                        <option value="">-- Select Election --</option>
                        {elections.map(e => (
                            <option key={e.id} value={e.id}>{e.election_name}</option>
                        ))}
                    </select>
                    <button onClick={handleFormSubmit}>Submit</button>
                </div>
            )}
        </div>
    );
}

export default UserDashboard;
