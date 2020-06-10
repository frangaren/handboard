import React from 'react';

export interface Position {
    x: number,
    y: number,
};

export interface GamepadInputContextValue {
    buttons?: readonly boolean[],
    axes?: readonly number[],
};

export const GamepadInputContext =
    React.createContext<GamepadInputContextValue>({
        buttons: undefined,
        axes: undefined
    });