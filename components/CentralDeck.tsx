import { socketContext } from '@/app/context/Socket';
import CardTemplate from '@/utils/Card';
import { cardList } from '@/utils/cardObjects';
import { AnimatePresence, motion } from "motion/react"

import React, { useContext } from 'react'


const CentralDeck = () => {
  
  const sc = useContext(socketContext)
  const centralCard = sc?.gameState.discardCard
  
  
  return (
    <div className='aspect-[1/1.37] h-36 absolute bottom-[40%] left-1/2 translate-x-[-50%]'>
        
        
        {centralCard && 
        <motion.div 
        layoutId={centralCard.id} 
        key={centralCard.id} 
        className='h-full w-full bg-white rounded-lg left-1/2 cursor-default' 
        >
          <CardTemplate className='h-full w-auto absolute bg-white rounded-lg left-1/2 translate-x-[-50%] cursor-default' color={ centralCard?.color || 'red'} value={ centralCard?.value || '8' } />
        </motion.div>}
        
        
    </div>
  )
}

export default CentralDeck
