import React, { useState, useEffect } from 'react';
import './UserAction.css';
import DiceRoll from './Dice';

interface UserActionProps {
    user: 'first' | 'second';
    health: number;
    onDirection: (direction: 'left' | 'right') => void;
    onSubmit: () => void;
    initialPosition: number;
    onMove: (steps: number, direction: 'left' | 'right') => void;
}

const UserAction: React.FC<UserActionProps> = ({ user, health, onDirection, onSubmit, initialPosition, onMove }) => {
    const [rolling, setRolling] = useState(false);
    const [diceNumber, setDiceNumber] = useState(1);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const [steps, setSteps] = useState(0);

    const rollDice = () => {
        setRolling(true);
        setTimeout(() => {
            const newNumber = Math.floor(Math.random() * 6) + 1;
            setDiceNumber(newNumber);
            setSteps(newNumber);
            setRolling(false);
            onMove(newNumber, direction);
        }, 1000); // Roll animation duration
    };

    return (
        <div className="user-action text-center border">
            <h5>{user === 'first' ? 'First Player' : 'Second Player'}</h5>
            <p>Health: {health}</p>
            <div className="row justify-content-center">
                <div className="col-3 action-box border" onClick={() => { setDirection('left'); onDirection('left'); }}>left direction</div>
                <div className="col-3">
                    <DiceRoll diceNumber={diceNumber} rolling={rolling} rollDice={rollDice} />
                </div>
                <div className="col-3 action-box border" onClick={() => { setDirection('right'); onDirection('right'); }}>right direction</div>
            </div>
            <div className="row justify-content-center">
                <div className="col-6 action-box border" onClick={onSubmit}>submit button</div>
            </div>
        </div>
    );
};

export default UserAction;
