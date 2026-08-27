"use client";

import { createContext, useContext } from "react";

/* Which carousel card is on screen. StepCardsCarousel keeps every card in the
   deck mounted so the neighbours can peek out either side, which meant all of
   their gsap loops ran at once — the active card and both blurred neighbours.
   The loops gate on this as well as on viewport visibility, so only the card
   the reader is actually looking at animates.

   Defaults to true: a loop dropped on a page by itself has no carousel around
   it and should still play. */
export const CardActiveContext = createContext(true);

export const useCardActive = () => useContext(CardActiveContext);
