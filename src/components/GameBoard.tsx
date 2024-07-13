import React from 'react';
import monkeyLeftImage from '../assets/images/monkey-left.jpg';
import monkeyRightImage from '../assets/images/monkey-right.jpg';
import stickImage from '../assets/images/stick.jpg';
import backgroundImage from '../assets/images/background.jpg';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './GameBoard.css'; // Ensure your CSS file is imported

const GameBoard: React.FC = () => (
    <div className="game-board" >
        <div className="container-fluid h-100">
            {/* First Row for Monkeys */}
            <div className="row h-30 align-items-center">
                <div className="col d-flex justify-content-between">
                    <div className="col d-flex justify-content-center">
                        <img src={monkeyRightImage} alt="Monkey Right" className="img-fluid monkey-image" />
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col d-flex justify-content-center">
                        <img src={monkeyLeftImage} alt="Monkey Left" className="img-fluid monkey-image" />
                    </div>
                </div>
            </div>
            {/* Second Row for Sticks */}
            <div className="row h-20 align-items-end">
                <div className="col d-flex justify-content-around">
                    <div className="col d-flex justify-content-center">
                        <img src={stickImage} alt="Tree Trunk Center 1" className="img-fluid" />
                    </div>
                    <div className="col d-flex justify-content-center">
                        <img src={stickImage} alt="Tree Trunk Center 2" className="img-fluid" />
                    </div>
                    <div className="col d-flex justify-content-center">
                        <img src={stickImage} alt="Tree Trunk Center 3" className="img-fluid" />
                    </div>
                    <div className="col d-flex justify-content-center">
                        <img src={stickImage} alt="Tree Trunk Center 4" className="img-fluid" />
                    </div>
                    <div className="col d-flex justify-content-center">
                        <img src={stickImage} alt="Tree Trunk Center 5" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default GameBoard;
