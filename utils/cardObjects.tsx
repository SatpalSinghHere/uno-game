import Card from "./Card";

const red="#D32F2F";
const green = "#04db48";
const blue = "#0381FF";
const yellow = "#F8FF03";

interface Card{
    color: string,
    value: string
}

const red1 : Card = {
    color: red,
    value: '1'
}
const red2 : Card = {
    color: red,
    value: '2'
}
const red3 : Card = {
    color: red,
    value: '3'
}
const red4 : Card = {
    color: red,
    value: '4'
}
const blue1 : Card = {
    color: blue,
    value: '1'
}
const blue2 : Card = {
    color: blue,
    value: '2'
}
const blue3 : Card = {
    color: blue,
    value: '3'
}
const blue4 : Card = {
    color: blue,
    value: '4'
}

const cardList = [red1, red2, red3, red4, blue1, blue2, blue3, blue4]

export {cardList};
export {Card};