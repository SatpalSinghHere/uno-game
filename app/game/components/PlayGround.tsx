import { socketContext } from '@/app/context/SocketProvider';
import CentralDeck from '@/components/CentralDeck';
import PlayerLeft from '@/components/PlayerLeft';
import PlayerRight from '@/components/PlayerRight';
import PlayerTop from '@/components/PlayerTop';
import UsedCards from '@/components/UsedCards';
import VisibleCards from '@/components/VisibleCards';
import React, { useContext, useEffect, useState } from 'react'

const PlayGround = () => {
    const [players, setPlayers] = useState<number>(2);
    const SocketContext = useContext(socketContext)

    useEffect(() => {
        if (SocketContext) {
            setPlayers(SocketContext.playersOnline.length as number)
        }
    }, [SocketContext])

    return (
        <div>
            <div className="absolute w-full h-full items-center bg-red-950">
                <label htmlFor="players">Enter number of players:</label>
                {/* <select onChange={handlePlayerChange} value={players}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select> */}
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
        </div>
    )
}

export default PlayGround
