import React from 'react'
import LinearWithValueLabel from "./Healthbar";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CasinoIcon from '@mui/icons-material/Casino';
import { useEffect, useState } from "react";

const PlayerCard = () => {

    const [ player, setPlayer ] = useState({name: null, address:null, health:100, lastDice:null})
    const [ selectedArrow, setSelectedArrow] = useState('none');

    return (
        <div className='w-full border-2 rounded-lg px-1.5 py-1'>
            <h1>Player Name: {player.name}</h1>
            <p>Address: {player.address}</p>
            <p>Last Dice: {player.lastDice}</p>
            <LinearWithValueLabel fixedValue={player.health} />
            <div className='flex my-2'>
                <div className={`flex w-1/2 border-2 rounded-lg justify-center items-center ${selectedArrow === 'left' ? 'bg-green-500' : ''}`} onClick={() => setSelectedArrow('left')}>
                    <ArrowBackIcon fontSize="large"/>
                </div>
                <div className={`flex w-1/2 border-2 rounded-lg justify-center items-center ${selectedArrow === 'right' ? 'bg-green-500' : ''}`} onClick={() => setSelectedArrow('right')} >                
                    <ArrowForwardIcon fontSize="large"/>
                </div>
            </div>
            <div className="flex w-full justify-center items-center border-2 rounded-lg">
                <CasinoIcon fontSize="large"/>
            </div>
        </div>
    )
}

export default PlayerCard
