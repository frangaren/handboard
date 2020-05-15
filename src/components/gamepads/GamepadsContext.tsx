import React from 'react';

export type GamepadsContextValue = (Gamepad | null)[];

export const GamepadsContext =
    React.createContext<GamepadsContextValue>([]);