import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewResults = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/candidate/results")
            .then(res => {
                setCandidates(res.data);
            })
            .catch(err => {
                console.error("Error fetching results", err);
            });
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Election Results</h2>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Candidate Name</th>
                        <th className="border px-4 py-2">Party</th>
                        <th className="border px-4 py-2">Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map((c, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{c.name}</td>
                            <td className="border px-4 py-2">{c.party()}</td>
                            <td className="border px-4 py-2">{c.vote}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {candidates.length > 0 && (
                <div className="mt-4 text-green-700 font-semibold text-lg">
                    🏆 Winner: {candidates[0].name} ({candidates[0].party}) with {candidates[0].vote} votes!
                </div>
            )}
        </div>
    );
};

export default ViewResults;
