import CardTemplate from '@/utils/Card'
import CardBack from '@/utils/CardBack'
import { cardList } from '@/utils/cardObjects'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import FadingText from './FadingText'

const PlayerRight = forwardRef(({ noOfCards, myTurn, firstName }: { noOfCards: number, myTurn: boolean, firstName: string }, ref) => {

  const array = Array(noOfCards).fill(1)

  const [extraCardsCount, setExtraCardsCount] = useState<number>(0)

  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      setVisibleTrue: (count: number) => {
        setExtraCardsCount(count)
        console.log('setting right Fade text visible', extraCardsCount)
        setVisible(true)
      }
    }
  }, [])

  // console.log(array)

  return (
    <div className=' w-28 absolute right-[10%] top-1/2 translate-y-[-50%]'>
      {array.map((_, index) => {

        let translateX = (index + 1 - ((noOfCards - 6) / 2)) * 28
        // const translateY = index * 28
        if (noOfCards > 14 && noOfCards < 20) {
          translateX = (index + 1 - ((noOfCards - 6) / 2)) * 18
        }
        if (noOfCards > 19) {
          translateX = (index + 1 - ((noOfCards - 6) / 2)) * 14
        }

        let styles = {
          transform: `translateX(${translateX}px)`,
          zIndex: index,
          boxShadow: 'none',
          backgroundColor: 'none',
          rotate: '-90deg'
        }

        if (myTurn) {
          styles = {
            ...styles,
            boxShadow: '0px -10px 10px blue'
          }
        }

        return (
          <div key={index} className='absolute rounded-lg' style={styles}>
            <CardBack className={'w-full h-auto bg-white rounded-lg'} />
            {index==0 && <span style={{transform : `translate(${translateX - 28}px, 60px)`, rotate:'90deg'}} className='absolute text-white font-bold font-outline-1 text-lg'>{`${firstName}(${noOfCards})`}</span>}
          </div>
        )
      })}
      {visible && <FadingText onHide={() => { setVisible(false) }} noOfCards={extraCardsCount} />}
      
    </div>
  )
})

export default PlayerRight
