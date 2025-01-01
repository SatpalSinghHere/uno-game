import { Card, cardList } from "./cardObjects"

export const randomDeckGen = (length: number) => {
  const randomDeck = []
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * cardList.length)
    let card = {...cardList[index], id: crypto.randomUUID().replace(/-/g, '').slice(0, 10)}
    randomDeck.push(card)
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

  export const randomString = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let randomString = ''
    for (let i = 0; i < 10; i++) {
      randomString += alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    return randomString
  }