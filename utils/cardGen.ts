import { Card, cardList } from "./cardObjects"

export const randomDeckGen = (length: number) => {
    const randomDeck = []
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * cardList.length)
      randomDeck.push(cardList[index])
    }
    return randomDeck
  }
  
export const sortCards = (deck : Card[]) => {
    return deck.sort((a, b) => {
      if (a.color > b.color) {
        return 1
      } else if (a.color < b.color) {
        return -1
      } else {
        return a.value > b.value ? 1 : -1
      }
    })
  }