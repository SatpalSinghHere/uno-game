import CardTemplate from '@/utils/Card'
import CardBack from '@/utils/CardBack'
import { cardList } from '@/utils/cardObjects'
import React, { useState } from 'react'

const PlayerLeft = () => {

  const [noOfCards, setNoOfCards] = useState(10)

  const array = Array(noOfCards).fill(1)

  return (
    <div className=' w-28 h-1/2 absolute left-[10%] top-1/2 translate-y-[-50%]'>
      {array.map((_, index)=>{

        const translateY = index * 28

        const styles = {
          transform: `translateY(${translateY}px)`,
          zIndex: index
        }

        return (
          <div key={index} className='absolute ' style={styles}>
            <CardBack className={'w-full h-auto bg-white rounded-lg rotate-90'}/>
          </div>
        )
      })}
    </div>
  )
}

export default PlayerLeft
