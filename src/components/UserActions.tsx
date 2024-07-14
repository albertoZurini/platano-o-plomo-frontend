import React, { useState, useEffect } from 'react';
import './UserAction.css';
import DiceRoll from './Dice';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface UserActionProps {
    user: 'first' | 'second';
    health: number;
    onDirection: (direction: 'left' | 'right') => void;
    onSubmit: () => void;
    initialPosition: number;
    onMove: (steps: number, direction: 'left' | 'right') => void;
    playerCanJoin: boolean;
    setName: (playerName: string) => void;
    playerName: string;
    onBoardUser: (playerName: string) => void;
}

const UserAction: React.FC<UserActionProps> = ({ user, health, onDirection, onSubmit, initialPosition, onMove, playerCanJoin, setName, playerName, onBoardUser }) => {
    const [rolling, setRolling] = useState(false);
    const [diceNumber, setDiceNumber] = useState(1);
    const [direction, setDirection] = useState<'left' | 'right'>(user == 'first' ? 'right' : 'left');
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
        onSubmit()
    };

    return (
        <div className="user-action text-center border">
            {playerCanJoin &&
                (<div className='w-full flex justify-center items-center'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        onBoardUser(playerName);
                    }} className='flex flex-col items-center mx-2 my-2'>
                        <input
                            type='text'
                            value={playerName}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter your name'
                            className='text-center my-1' // Added margin-bottom for spacing
                        />
                        <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded'>
                            Join Game
                        </button>
                    </form>
                </div>)
            }
            <h5>{user === 'first' ? 'First Player' : 'Second Player'}</h5>
            <p>Health: {health}</p>

            <div className='flex my-2'>
                <div className={`flex w-1/2 border-2 rounded-lg justify-center items-center ${direction === 'left' ? 'bg-green-500' : ''}`} onClick={() => { setDirection('left'); onDirection('left'); }}>
                    <ArrowBackIcon fontSize="large" />
                </div>
                <div className="col-3">
                    <DiceRoll diceNumber={diceNumber} rolling={rolling} rollDice={rollDice} />
                </div>
                <div className={`flex w-1/2 border-2 rounded-lg justify-center items-center ${direction === 'right' ? 'bg-green-500' : ''}`} onClick={() => { setDirection('right'); onDirection('right'); }}>
                    <ArrowForwardIcon fontSize="large" />
                </div>
            </div>
        </div>
    );
};

export default UserAction;
