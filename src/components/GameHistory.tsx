import React, { useEffect, useState } from 'react';
import './GameHistory.css';


const GameHistory: React.FC = () => {
    const [history, setHistory] = useState([])
    useEffect(() => {
        getApi()
    },
        [])
    const getApi = () => {
        fetch("https://arbitrum-sepolia.blockscout.com/api/v2/addresses/0x39a2D23C1D2DcCc391942cf88F6cDD9Db9930D74/transactions?filter=to%20%7C%20from")
            .then(data => data.body)
            .then(data => {
                const reader = data?.getReader()
                return reader?.read()
            })

    }

    return (
        <div className="game-history">
            <h5>Game History</h5>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
        </div>
    )
};

export default GameHistory;
