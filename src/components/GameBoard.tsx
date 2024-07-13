import React from 'react';
import stickImage from '../assets/images/stick.png';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './GameBoard.css'; // Ensure your CSS file is imported
import { Player } from '../interfaces/player.interface';
import Monkey from './Monkey';

interface GameBoardProps {
    playerOne: Player;
    playerTwo: Player;
}

const GameBoard: React.FC<GameBoardProps> = ({ playerOne, playerTwo }) => {
    return (
        <div className="game-board">
            <div className="container-fluid h-100">
                <div className="row align-items-end" style={{ height: "75%" }}>
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="col d-flex justify-content-center position-relative">
                            {playerOne.position === index && <Monkey player={playerOne} />}
                            {playerTwo.position === index && <Monkey player={playerTwo} />}
                        </div>
                    ))}
                </div>
                {/* Second Row for Sticks */}
                <div className="row align-items-start" style={{ height: "20%" }}>
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="col d-flex justify-content-center">
                            <img src={stickImage} alt={`Tree Trunk Center ${index + 1}`} className="img-fluid" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameBoard;
