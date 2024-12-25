import React, { ChangeEvent, useState } from 'react'
import UsedCards from './UsedCards';
import PlayerTop from './PlayerTop';
import PlayerLeft from './PlayerLeft';
import PlayerRight from './PlayerRight';
import CentralDeck from './CentralDeck';
import VisibleCards from './VisibleCards';

const Room = () => {
    const [players, setPlayers] = useState(2);

    const handlePlayerChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPlayers(parseInt(e.target.value));
      };
  return (
    <div className="absolute w-full h-full items-center bg-red-950">
      <label htmlFor="players">Enter number of players:</label>
      <select onChange={handlePlayerChange} value={players}>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <UsedCards />
      {players === 2 && <PlayerTop />}
      {players === 3 && (
        <>
          <PlayerLeft />
          <PlayerRight />
        </>
      )}
      {players === 4 && (
        <>
          <PlayerLeft />
          <PlayerRight />
          <PlayerTop />
        </>
      )}
      <CentralDeck />
      <VisibleCards />
    </div>
  )
}

export default Room
