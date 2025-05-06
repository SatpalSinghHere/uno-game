'use client'

import { Card } from "@/utils/cardObjects";
import { createContext } from "react";

export interface CentralCardContext {
    centralCard : Card,
    emitNewCentralCard : (card: Card) => void
}

export const centralCardContext = createContext<CentralCardContext | null>(null);