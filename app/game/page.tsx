'use client'

import React, { ChangeEvent, useCallback, useState } from 'react'
import UsedCards from '@/components/UsedCards';
import PlayerTop from '@/components/PlayerTop';
import PlayerLeft from '@/components/PlayerLeft';
import PlayerRight from '@/components/PlayerRight';
import CentralDeck from '@/components/CentralDeck';
import VisibleCards from '@/components/VisibleCards';
import { Card, cardList } from '@/utils/cardObjects';
import { centralCardContext } from '../context/centralCard';
import SocketProvider from '../context/SocketProvider';

const GameRoom = () => {
  const [players, setPlayers] = useState(2);

  const handlePlayerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlayers(parseInt(e.target.value));
  };

  // const [centralCard, setCentralCard] = useState(cardList[cardList.length - 1])
  // const newCentralCard = useCallback((card : Card) => {
  //   console.log('changling centralCard', card)
  //   setCentralCard(card)
  // }, [])


  return (
    <SocketProvider>
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
    </SocketProvider>
  )
}

export default GameRoom
