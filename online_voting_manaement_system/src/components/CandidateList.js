import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CandidateList.css';

function CandidateList() {
    const { electionId } = useParams();  //route param get
    const [candidates, setCandidates] = useState([]);

    const [hasVoted, setHasVoted] = useState(false);
    const [votedCandidateId, setVotedCandidateId] = useState(null);


    useEffect(() => {
        if (!electionId) return;

        fetch(`http://localhost:8080/candidate/findalls`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCandidates(data);
                } else {
                    setCandidates([]);
                    console.error("Candidate data is not an array:", data);
                }
            })
            .catch(err => console.error(err));
    }, [electionId]);

    const handleVote = async (candidateId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/candidate/vote/${candidateId}`,
                { method: 'POST', headers: { 'Content-Type': 'application/json' } }
            );

            if (response.ok) {
                alert('Voted successfully!');
                setHasVoted(true);
                setVotedCandidateId(candidateId);
                //data feach upate votes
                const res = await fetch(`http://localhost:8080/candidate/findalls`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    const sorted = [...data].sort((a, b) => b.votes - a.votes);
                    setCandidates(sorted);
                }
            } else {
                alert('Failed to vote. Please try again.');
            }
        } catch (error) {
            console.error('Error while voting:', error);
            alert('Failed to vote. Server error.');
        }
    };




    return (
        <div className="candidate-form">
            <h1>ELECTION 2025</h1>



            <table className="candidate-table" border="1">
                <thead>
                    <tr>
                        <th>Candidate Profile</th>
                        <th>Candidate Name</th>
                        <th>Party Name</th>
                        <th>Vote</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(candidate => (
                        <tr key={candidate.id} className="candidate-row">
                            <td>
                                <img
                                    src={`http://localhost:8080/img/${candidate.img}`}
                                    alt="Candidate"
                                    width="100"
                                    height="100"
                                />
                            </td>
                            <td>{candidate.name}</td>
                            <td>{candidate.party}</td>
                            <td>
                                {hasVoted
                                    ? (
                                        candidate.id === votedCandidateId
                                            ? <button disabled>Voted ✓</button>
                                            : <button disabled style={{ visibility: 'hidden' }}>Vote</button>
                                    )
                                    : (
                                        <button onClick={() => handleVote(candidate.id)}>Vote</button>
                                    )
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default CandidateList;
