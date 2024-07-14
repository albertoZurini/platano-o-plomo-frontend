import React, { useState } from 'react';

const RecentMoves = () => {
  // Step 1: Define the state for storing moves
  const [moves, setMoves] = useState([
    { diceNumber: 4, dealtDamage: 5, player: '1', startIndex: 3, endIndex: 7, direction: 'Forward' },
    // Add more moves as needed
  ]);

  return (
    <div>
      <table className='w-full'>
        <thead>
          <tr>
            <th className='text-xs text-center'>Player</th>
            <th className='text-xs text-center'>Dice Number</th>
            <th className='text-xs text-center'>Start Index</th>
            <th className='text-xs text-center'>End Index</th>
            <th className='text-xs text-center'>Direction</th>
            <th className='text-xs text-center'>Dealt Damage</th>
          </tr>
        </thead>
        <tbody>
          {moves.map((move, index) => (
            <tr key={index}>
              <td className='text-xs text-center'>{move.player}</td>
              <td className='text-xs text-center'>{move.diceNumber}</td>
              <td className='text-xs text-center'>{move.startIndex}</td>
              <td className='text-xs text-center'>{move.endIndex}</td>
              <td className='text-xs text-center'>{move.direction}</td>
              <td className='text-xs text-center'>{move.dealtDamage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentMoves;
