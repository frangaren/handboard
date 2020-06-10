import React from 'react';

export interface Position {
    x: number,
    y: number,
};

export type HandAction = 'hover' | 'grab' | 'interact';

export interface HandGestureState {
    position?: Position,
    action: HandAction,
};

export interface GestureContextValue {
    leftHand: HandGestureState,
    rightHand: HandGestureState,
};

export const GestureContext = React.createContext<GestureContextValue>({
    leftHand: {
        position: undefined,
        action: 'hover',
    },
    rightHand: {
        position: undefined,
        action: 'hover',
    },
});