import React from 'react';
import stickImage from '../assets/images/stick.jpg';
import backgroundImage from '../assets/images/background.jpg';
import monkeyGreenImage from '../assets/images/monkey-green.png';  // Ensure to use the correct path
import monkeyBrownImage from '../assets/images/monkey-brown.png'; // Ensure to use the correct path
import bigBananaInHandImage from '../assets/images/big-banana-in-hand.png'; // Ensure to use the correct path
import smallBananaInHandImage from '../assets/images/small-banana-in-hand.png'; // Ensure to use the correct path
import smallBananaImage from '../assets/images/small-banana.png'; // Ensure to use the correct path
import bigBananaImage from '../assets/images/big-banana.png'; // Ensure to use the correct path
import bananaRain from "../assets/images/banana-rain.gif";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './GameBoard.css'; // Ensure your CSS file is imported
import { GunType, Player } from '../interfaces/player.interface';

interface GameBoardProps {
    playerOne: Player;
    playerTwo: Player;
}

const GameBoard: React.FC<GameBoardProps> = ({ playerOne, playerTwo }) => {
    function shouldShowGun(type : GunType, isShooting : boolean, inHand : boolean){
        if(!isShooting || type === GunType.NONE)
            return false;

        return !inHand;
    }
    function shouldShowGunInHand(type : GunType, isShooting : boolean, inHand : boolean){
        console.log(type, isShooting, inHand)
        if(!isShooting || type === GunType.NONE)
            return false;

        return inHand;
    }

    return (
        <div className="game-board">
            <div className="container-fluid h-100">
                <div className="row h-50 align-items-center">

                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="col d-flex justify-content-center position-relative">
                            {playerOne.position === index && (
                                <div className='monkey-image' style={{ 'transform': playerOne.direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)' }}>
                                        <div>
                                            <img src={playerOne.gun.type === GunType.BIG ? bigBananaInHandImage : smallBananaInHandImage} alt="Banana" 
                                                className={`absolute 
                                                    ${shouldShowGunInHand(playerOne.gun.type, playerOne.isShooting, playerOne.gun.isInHand) ? "opacity-100" : "opacity-0"} 
                                                `} />
                                            
                                            <div
                                                className={`absolute 
                                                ${shouldShowGun(playerOne.gun.type, playerOne.isShooting, playerOne.gun.isInHand) ? "opacity-100" : "opacity-0"} 
                                            ${playerOne.gun.isMoving ? `gun-animation-${playerOne.gun.delta}` : ""}`}>

                                                <img src={playerOne.gun.type === GunType.BIG ? bigBananaImage : smallBananaImage} alt="Banana"
                                                className={playerOne.gun.showRain ? "opacity-0" : "opacity-100"}
                                                     />
                                                <img src={bananaRain} className={`absolute ${playerOne.gun.showRain ? "opacity-100" : "opacity-0"}`} style={{transform: "translateY(-100%)"}}/>

                                            </div>
                                        </div>
                                    < img src={monkeyGreenImage} alt="Monkey Left" className={playerOne.isShooting ? "monkey-standing" : "monkey-jumping"} />
                                </div>
                            )}

                            {playerTwo.position === index && (
                                <div className='monkey-image' style={{ 'transform': playerTwo.direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)' }}>
                                        <div>
                                            <img src={playerTwo.gun.type === GunType.BIG ? bigBananaInHandImage : smallBananaInHandImage} alt="Banana" 
                                                className={`absolute 
                                                    ${shouldShowGunInHand(playerTwo.gun.type, playerTwo.isShooting, playerTwo.gun.isInHand) ? "opacity-100" : "opacity-0"} 
                                                `} />
                                            
                                            <div
                                                className={`absolute 
                                                ${shouldShowGun(playerTwo.gun.type, playerTwo.isShooting, playerTwo.gun.isInHand) ? "opacity-100" : "opacity-0"} 
                                            ${playerTwo.gun.isMoving ? `gun-animation-${playerTwo.gun.delta}` : ""}`}>

                                                <img src={playerTwo.gun.type === GunType.BIG ? bigBananaImage : smallBananaImage} alt="Banana"
                                                className={playerTwo.gun.showRain ? "opacity-0" : "opacity-100"}
                                                     />
                                                <img src={bananaRain} className={`absolute ${playerTwo.gun.showRain ? "opacity-100" : "opacity-0"}`} style={{transform: "translateY(-100%)"}}/>

                                            </div>
                                        </div>
                                    < img src={monkeyBrownImage} alt="Monkey Left" className={playerTwo.isShooting ? "monkey-standing" : "monkey-jumping"} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Second Row for Sticks */}
                <div className="row h-20 align-items-end">
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
