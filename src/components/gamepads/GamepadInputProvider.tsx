import React, { useContext, useState, useEffect } from 'react';

import {
    GamepadInputContext,
    GamepadInputContextValue,
} from './GamepadInputContext';
import { GamepadsContext } from './GamepadsContext';

export interface GamepadInputProviderProps {
    children?: React.ReactNode,
    pollingInterval?: number,
};

export function GamepadInputProvider (props: GamepadInputProviderProps) {
    const gamepads = useContext(GamepadsContext);
    const [index, setIndex] = useState<number | undefined>(0);
    const [input, setInput] = useState<GamepadInputContextValue>({
        buttons: undefined,
        axes: undefined,
    });
    useEffect(() => {
        if (!index  || gamepads[index] === null) {
            let found = false;
            for (let i = 0; i < gamepads.length; i++) {
                if (gamepads[i] !== null) {
                    found = true;
                    setIndex(i);
                    break;
                }
                if (!found) {
                    setIndex(undefined);
                }
            }
        }
    }, [gamepads, index])
    useEffect(() => {
        const interval = setInterval(() => {
            if (index != null) {
                setInput({
                    buttons: gamepads[index]?.buttons.map(
                        button => button.pressed
                    ),
                    axes: gamepads[index]?.axes,
                });
            } else {
                setInput({
                    buttons: undefined,
                    axes: undefined,
                });
            }
        }, props.pollingInterval ?? 50);
        return () => { clearInterval(interval) };
    }, [gamepads, index, props.pollingInterval]);
    return (
        <GamepadInputContext.Provider value={input}>
            {props.children}
        </GamepadInputContext.Provider>
    );
};