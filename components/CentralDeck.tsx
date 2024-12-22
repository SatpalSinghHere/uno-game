import { socketContext } from '@/app/context/SocketProvider';
import CardTemplate from '@/utils/Card';
import { Card, cardList } from '@/utils/cardObjects';



import React, { useContext } from 'react'


const CentralDeck = () => {
  const defaultCard: Card = {
    color: 'red',
    value: '1'
  }
  const gameState = useContext(socketContext)?.gameState
  const centralCard = gameState?.discardCard
  
  
  return (
    <div className=' w-1/12 h-36 absolute bottom-[40%] left-1/2 translate-x-[-50%]'>
      {/* {centralDeck.map((cardObj, index) => {
        const getRandomInt = (min:number, max:number) => Math.floor(Math.random() * (max - min)) + min;
        const degree = getRandomInt(-70,70)

        const cardStyles = {
          transform: `rotate(${degree}deg)`,
          transformOrigin: 'center',
        };
        const cardClasses = clsx(
          'h-full w-auto absolute bg-white rounded-lg left-1/2 translate-x-[-50%] cursor-default',
          // `rotate-[${degree}deg]` // Tailwind-compatible class name with dynamic value
        );

        return <div className={cardClasses} key={index} ><CardTemplate className={cardClasses} color={cardObj.color} value={cardObj.value} /></div>
      })} */}
        <div className='h-full w-auto absolute bg-white rounded-lg left-1/2 translate-x-[-50%] cursor-default' ><CardTemplate className='h-full w-auto absolute bg-white rounded-lg left-1/2 translate-x-[-50%] cursor-default' color={centralCard? centralCard.color : defaultCard.color} value={centralCard? centralCard.value : defaultCard.value} /></div>
    </div>
  )
}

export default CentralDeck
