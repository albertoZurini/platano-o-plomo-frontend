import React, { useEffect, useState } from 'react';
import './GameHistory.css';


const GameHistory: React.FC = () => {
    const [history, setHistory] = useState<string[]>([])
    useEffect(() => {
        getApi()
    },
        [])
    const getApi = () => {
        fetch("https://arbitrum-sepolia.blockscout.com/api/v2/addresses/0x39a2D23C1D2DcCc391942cf88F6cDD9Db9930D74/transactions?filter=to%20%7C%20from")
        .then(data => data.json())
        .then(data => {
            let parsed : string[] = []
            for(let item of data.items.reverse()){
                if(item.method == null) continue;
                let date = new Date(item.timestamp);
                parsed.push(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${item.method}`)
            }
            console.log(parsed)
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
