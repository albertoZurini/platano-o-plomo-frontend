import React from 'react';
import './GameHistory.css';

interface GameHistoryProps {
    history: string[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => (
    <div className="game-history">
        <h5>Game History</h5>
        <ul>
            {history.map((entry, index) => (
                <li key={index}>{entry}</li>
            ))}
        </ul>
    </div>
);

export default GameHistory;
