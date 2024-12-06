import { Card, cardList } from '@/utils/cardObjects'
import React, { useCallback, useState } from 'react'
import { centralCardContext } from './centralCard'

interface SocketProviderProps {
    children: React.ReactNode
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [centralCard, setCentralCard] = useState(cardList[cardList.length - 1])
    const newCentralCard = useCallback((card: Card) => {
        console.log('changling centralCard', card)
        setCentralCard(card)
    }, [])

    return (
        <centralCardContext.Provider value={{centralCard, newCentralCard}}>
            {children}
        </centralCardContext.Provider>
    )
}

export default SocketProvider
