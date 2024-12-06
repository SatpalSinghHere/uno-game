'use client'

import CardTemplate from "@/utils/Card";
import { Card, cardList } from "@/utils/cardObjects";
import { createContext } from "react";

interface CentralCardContext {
    centralCard : Card,
    newCentralCard : (card: Card) => void
}

export const centralCardContext = createContext<CentralCardContext | null>(null);