import React from 'react'
import { motion } from 'motion/react'
import CardBack from '@/utils/CardBack'
import { Card } from '@/utils/cardObjects'
import { randomDeckGen } from '@/utils/cardGen'

const Deck = () => {
    const cards: Card[] = randomDeckGen(10)
    return (
        <div className=' w-1/12 h-36 bottom-[40%] relative left-[35%] translate-x-[-50%]'>

            {cards.map((card, index) => {
                const x = index * 2
                return (
                    <motion.div
                        layoutId={card.id}
                        key={card.id}
                        initial={{ x: x, y: 0 }}
                        animate={{ x: x, y: 0 }}
                        className='bg-white p-[2px] h-full aspect-[1/1.37] m-1 rounded-lg absolute'
                    >
                        <CardBack className='w-full' />
                    </motion.div>
                )
            })}



        </div>
    )
}

export default Deck
