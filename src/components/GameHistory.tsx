import React, { useEffect, useState } from 'react';
import './GameHistory.css';


const GameHistory: React.FC = () => {
    const [history, setHistory] = useState<string[]>([])
    useEffect(() => {
        getApi()
    },
        [])
    const getApi = () => {
        fetch("https://arbitrum-sepolia.blockscout.com/api/v2/addresses/0xEA5c7126e40c4502954Bb3D1DA6ce7d8F58f9d3D/transactions?filter=to%20%7C%20from")
            .then(data => data.json())
            .then(data => {
                let parsed: string[] = []
                for (let item of data.items.reverse()) {
                    if (item.method == null) continue;
                    let date = new Date(item.timestamp);
                    parsed.push(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${item.method}`)
                }
                setHistory(parsed)
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
