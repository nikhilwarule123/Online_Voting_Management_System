import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import ViewUsers from './ViewUsers';
import { useNavigate } from 'react-router-dom';//navigate first page to another page


function AdminDashboard() {
    const [showAddElectionForm, setShowAddElectionForm] = useState(false);
    const [showAddCandidateForm, setShowAddCandidateForm] = useState(false);
    const [showCandidateList, setShowCandidateList] = useState(false);
    const [isResultsView, setIsResultsView] = useState(false);

    // Election form states
    const [electionName, setElectionName] = useState('');
    const [date, setDate] = useState('');

    // Candidate form states
    const [candidateName, setCandidateName] = useState('');
    const [partyName, setPartyName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);

    const [candidateList, setCandidateList] = useState([]);

    // candidate view candidate state variable
    const [showViewUsers, setShowViewUsers] = useState(false);

    // add background img

    const isHomePage = !showAddElectionForm && !showAddCandidateForm && !showCandidateList && !isResultsView && !showViewUsers;



    // Show Add Election
    const handleAddElectionClick = (e) => {
        e.preventDefault();
        setShowAddElectionForm(true);
        setShowAddCandidateForm(false);
        setShowCandidateList(false);
        setIsResultsView(false);
        // double image not show
        setShowViewUsers(false);

    };

    // Show Add Candidate
    const handleAddCandidateClick = (e) => {
        e.preventDefault();
        setShowAddElectionForm(false);
        setShowAddCandidateForm(true);
        setShowCandidateList(false);
        setIsResultsView(false);
        setShowViewUsers(false);

    };

    const handleViewResultsClick = async () => {
        setIsResultsView(true);
        setShowAddElectionForm(false);
        setShowAddCandidateForm(false);
        setShowCandidateList(true);
        setShowViewUsers(false);



        try {
            const res = await fetch("http://localhost:8080/candidate/results");
            const data = await res.json();
            const sorted = data.sort((a, b) => b.vote - a.vote);
            setCandidateList(sorted);
        } catch (err) {
            console.error('Error fetching results:', err);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setImage(file);
    };

    const handleViewCandidatesClick = async (e) => {
        e.preventDefault();
        setShowAddElectionForm(false);
        setShowAddCandidateForm(false);
        setShowCandidateList(true);
        setIsResultsView(false);
        setShowViewUsers(false); // 👈 ViewUsers hide show

        try {
            const res = await fetch('http://localhost:8080/candidate/list');
            const data = await res.json();
            setCandidateList(data);
        } catch (err) {
            console.error('Error fetching candidates:', err);
        }
    };

    const handleElectionSubmit = async (e) => {
        e.preventDefault();
        if (!electionName || !date) {
            alert('Please fill election name and date');
            return;
        }

        const payload = { election_name: electionName, date: date };

        try {
            const response = await fetch('http://localhost:8080/addelectionc/saveaddcandite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Election saved successfully');
                setElectionName('');
                setDate('');
                setShowAddElectionForm(false);
            } else {
                alert('Failed to save election');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving election');
        }
    };

    const handleCandidateSubmit = async (e) => {
        e.preventDefault();

        if (!candidateName || !partyName || !address || !phone) {
            alert('Please fill all candidate fields');
            return;
        }

        // handling view list admin
        const candidatelist = {

        }

        const candidatePayload = {
            name: candidateName,
            party: partyName,
            address: address,
            phone: phone,
            img: image ? image.name : 'noimage.jpg',
            vote: '0',
        };

        try {
            const response = await fetch('http://localhost:8080/candidate/savecandite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(candidatePayload),
            });

            if (response.ok) {
                alert('Candidate added successfully');
                setCandidateName('');
                setPartyName('');
                setAddress('');
                setPhone('');
                setImage(null);
                setShowAddCandidateForm(false);
            } else {
                alert('Failed to add candidate');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving candidate');
        }
    };


    //function home
    const handleHomeClick = (e) => {
        e.preventDefault();
        setShowAddElectionForm(false);
        setShowAddCandidateForm(false);
        setShowCandidateList(false);
        setIsResultsView(false);
        setShowViewUsers(false);
    };

    // Then in navbar:
    <li><a href="#" onClick={handleHomeClick}>HOME</a></li>

    // logout 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/login'); //redirect
    };


    return (
        <div className="admin-dashboard">
            <nav className="navbar">
                <ul>
                    <li><a href="#" onClick={handleHomeClick}>HOME</a></li>
                    <li><a href="#" onClick={handleAddElectionClick}>ADD ELECTION</a></li>
                    <li><a href="#" onClick={handleAddCandidateClick}>ADD CANDIDATE</a></li>
                    <li><a href="#" onClick={handleViewResultsClick}>VIEW RESULTS</a></li>
                    <li><a href="#" onClick={() => {
                        setShowAddElectionForm(false);
                        setShowAddCandidateForm(false);
                        setShowCandidateList(false);
                        setIsResultsView(false);
                        setShowViewUsers(true); // view show user
                    }}>VIEW VOTERS LIST</a></li>


                    <li><a href="#" onClick={handleLogout}>LOGOUT</a></li>
                </ul>
            </nav>

            <div className="banner">
                ONLINE ELECTION SYSTEM
            </div>

            {/* ADD ELECTION FORM */}
            {showAddElectionForm && (
                <div className="election-form">
                    <h2>ADD ELECTION</h2>
                    <form onSubmit={handleElectionSubmit}>
                        <div className="form-group">
                            <label>Election Name:</label>
                            <div className="input-icon">
                                <span className="icon">💬</span>
                                <input
                                    type="text"
                                    placeholder="Enter Election Name"
                                    value={electionName}
                                    onChange={(e) => setElectionName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>End Date:</label>
                            <div className="input-icon">
                                <span className="icon">📅</span>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">SUBMIT</button>
                    </form>
                </div>
            )}

            {/* ADD CANDIDATE FORM */}
            {showAddCandidateForm && (
                <div className="add-candidate-form">
                    <h2 className="form-title">ADD CANDIDATE</h2>
                    <form onSubmit={handleCandidateSubmit}>
                        <div className="input-group">
                            <span className="input-icon">👤</span>
                            <input
                                type="text"
                                placeholder="Candidate Name"
                                value={candidateName}
                                onChange={(e) => setCandidateName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon">🧑‍🤝‍🧑</span>
                            <input
                                type="text"
                                placeholder="Party Name"
                                value={partyName}
                                onChange={(e) => setPartyName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon">🏠</span>
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon">📞</span>
                            <input
                                type="text"
                                placeholder="Phone No"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon">🖼️</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        <button type="submit" className="submit-btn">SUBMIT</button>
                    </form>
                </div>
            )}

            {/* CANDIDATE LIST / RESULTS */}
            {showCandidateList && (
                <div className="candidate-list">
                    <h2>MLA ELECTION 2025</h2>

                    {isResultsView && candidateList.length > 0 && (
                        <h3 style={{ color: 'green', margin: '10px 0' }}>
                            🏆 Winner: {candidateList[0].name} ({candidateList[0].party})
                        </h3>
                    )}

                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Party</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidateList.map((c, i) => (
                                <tr key={i}>
                                    <td><img src={`http://localhost:8080/img/${c.img}`} width="100" height="100" alt="Candidate" /></td>
                                    <td>{c.name}</td>
                                    <td>{c.party}</td>
                                    <td>{c.address}</td>
                                    <td>{c.phone}</td>
                                    <td>{c.vote}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* view list show */}

            {showViewUsers && (
                <div className="view-users-section">
                    <h2>USER APPROVAL</h2>
                    <ViewUsers />
                </div>
            )}


            {/* home page add image */}
            <div

                className="admin-dashboard"

                style={{
                    backgroundImage: isHomePage ? "url('/img/vote7.jpg')" : 'none',

                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                    color: isHomePage ? 'white' : 'inherit',
                }}
            >

            </div>










        </div >

    );
}

export default AdminDashboard;
