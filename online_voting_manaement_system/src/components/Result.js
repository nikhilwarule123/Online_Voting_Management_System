import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Result() {
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        api.get('/votes/findalls').then(res => setVotes(res.data));
    }, []);

    return (
        <div>
            <h3>Vote Results</h3>
            <ul>
                {votes.map(v => (
                    <li key={v.id}>Voter ID: {v.voterId}, Candidate ID: {v.candidateId}</li>
                ))}
            </ul>
        </div>
    );
}

export default Result;
