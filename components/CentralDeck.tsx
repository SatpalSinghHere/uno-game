import { socketContext } from '@/app/context/SocketProvider';
import CardTemplate from '@/utils/Card';

import React, { useContext } from 'react'


const CentralDeck = () => {
  
  const gameState = useContext(socketContext)?.gameState
  const centralCard = gameState?.discardCard
  
  
  return (
    <div className=' w-1/12 h-36 absolute bottom-[40%] left-1/2 translate-x-[-50%]'>
        
        
        <div className='h-full w-auto absolute bg-white rounded-lg left-1/2 translate-x-[-50%] cursor-default' ><CardTemplate className='h-full w-auto absolute bg-white rounded-lg left-1/2 translate-x-[-50%] cursor-default' color={ centralCard?.color || 'red'} value={ centralCard?.value || '8' } /></div>
        
    </div>
  )
}

export default CentralDeck
