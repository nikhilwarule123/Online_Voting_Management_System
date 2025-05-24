import React, { useState, useEffect } from 'react';
import api from '../services/api';

function VoteForm({ voterId }) {
    const [candidates, setCandidates] = useState([]);
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => {
        api.get('/admins/findall').then(res => setCandidates(res.data));
    }, []);

    const handleVote = async () => {
        await api.post('/votes/savev', { voterId, candidateId: selectedId });
        alert('Vote submitted');
    };

    return (
        <div>
            <h3>Select a Candidate</h3>
            <select onChange={(e) => setSelectedId(e.target.value)}>
                {candidates.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
            <button onClick={handleVote}>Vote</button>
        </div>
    );
}

export default VoteForm;
