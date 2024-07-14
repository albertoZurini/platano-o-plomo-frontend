import React from 'react';
import './Dice.css';

interface DiceRollProps {
    diceNumber: number;
    rolling: boolean;
    rollDice: () => void;
}

const DiceRoll: React.FC<DiceRollProps> = ({ diceNumber, rolling, rollDice }) => {

    return (
        <div className="dice-roll">
            <div className={`dice ${rolling ? 'rolling' : ''}`} onClick={rollDice}>
                <img src={require(`../assets/images/dice-${diceNumber === 0 ? 1 : diceNumber}.png`)} alt={`Dice ${diceNumber}`} />
            </div>
        </div>
    )
};

export default DiceRoll;
