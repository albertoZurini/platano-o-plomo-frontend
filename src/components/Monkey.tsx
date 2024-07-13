import React from 'react';
import { GunType, Player } from '../interfaces/player.interface';
import bigBananaInHandImage from '../assets/images/big-banana-in-hand.png';
import smallBananaInHandImage from '../assets/images/small-banana-in-hand.png';
import smallBananaImage from '../assets/images/small-banana.png';
import bigBananaImage from '../assets/images/big-banana.png';
import bananaRain from "../assets/images/banana-rain.gif";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Monkey.css';

interface MonkeyProps {
    player: Player;
}

// Utility functions moved outside the component
function shouldShowGun(type: GunType, isShooting: boolean, inHand: boolean): boolean {
    return isShooting && type !== GunType.NONE && !inHand;
}

function shouldShowGunInHand(type: GunType, isShooting: boolean, inHand: boolean): boolean {
    return isShooting && type !== GunType.NONE && inHand;
}

const Monkey: React.FC<MonkeyProps> = ({ player }) => {
    const { direction, gun, image, isShooting } = player; // Destructuring for cleaner access
    const gunImage = gun.type === GunType.BIG ? bigBananaImage : smallBananaImage;
    const gunInHandImage = gun.type === GunType.BIG ? bigBananaInHandImage : smallBananaInHandImage;

    return (
        <div className='monkey-image' style={{ transform: direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)' }}>
            <div>
                <img src={gunInHandImage} alt="Banana"
                    className={`absolute ${shouldShowGunInHand(gun.type, isShooting, gun.isInHand) ? "opacity-100" : "opacity-0"}`} />

                <div className={`absolute ${shouldShowGun(gun.type, isShooting, gun.isInHand) ? "opacity-100" : "opacity-0"} 
                ${gun.isMoving ? `gun-animation-${gun.delta}` : ""}`}>
                    <img src={gunImage} alt="Banana" className={gun.showRain ? "opacity-0" : "opacity-100"} />
                    <img src={bananaRain} className={`absolute ${gun.showRain ? "opacity-100" : "opacity-0"}`} style={{ transform: "translateY(-100%)" }} />
                </div>
            </div>
            <img src={image} alt="Monkey" className={isShooting ? "monkey-standing" : "monkey-jumping"} />
        </div>
    );
};

export default Monkey;