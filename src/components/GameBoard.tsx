import React from 'react';
import monkeyLeftImage from '../assets/images/monkey-left.jpg';
import monkeyRightImage from '../assets/images/monkey-right.jpg';
import bananaImage from '../assets/images/banana.jpg';
import stickImage from '../assets/images/stick.jpg';
import backgroundImage from '../assets/images/background.jpg';
import './GameBoard.css'; // Create this CSS file for styling

const GameBoard: React.FC = () => (
    <div className="game-board" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="monkey-right">
            <img src={monkeyRightImage} alt="Monkey Right" className="monkey" />
            <img src={stickImage} alt="Tree Trunk" className="stick" />

        </div>
        <div className="stick-center">
            <img src={stickImage} alt="Tree Trunk Center 1" className="stick center" />
            <img src={stickImage} alt="Tree Trunk Center 2" className="stick center" />
            <img src={stickImage} alt="Tree Trunk Center 3" className="stick center" />
        </div>
        <div className="monkey-left">
            <img src={monkeyLeftImage} alt="Monkey Left" className="monkey" />
            <img src={stickImage} alt="Tree Trunk" className="stick" />
        </div>
    </div>
);

export default GameBoard;
