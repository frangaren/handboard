import React from 'react';

export interface Position {
    x: number,
    y: number,
};

export interface SmoothHandContext {
    leftHand: Position,
    rightHand: Position,
};

export const SmoothHandContext =
    React.createContext<SmoothHandContext | undefined>(undefined);