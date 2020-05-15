import React, { useState, useEffect } from 'react';

import { GamepadsContextValue, GamepadsContext } from './GamepadsContext';

export interface GamepadsProviderProps {
    children: React.ReactNode,
};

export function GamepadsProvider(props: GamepadsProviderProps) {
    const [Gamepads, setGamepads] = useState<GamepadsContextValue>([]);
    useEffect(() => {
        function on_gamepad_connected() {
            setGamepads(navigator.getGamepads());
        };
        function on_gamepad_disconnected() {
            setGamepads(navigator.getGamepads())
        };
        window.addEventListener('gamepadconnected', on_gamepad_connected);
        window.addEventListener('gamepaddisconnected', on_gamepad_disconnected);
        setGamepads(navigator.getGamepads())
        return () => {
            window.removeEventListener(
                'gamepadconnected',
                on_gamepad_connected
            );
            window.removeEventListener(
                'gamepaddisconnected',
                on_gamepad_disconnected
            );
        };
    }, [Gamepads]);
    return (
        <GamepadsContext.Provider value={Gamepads}>
            {props.children}
        </GamepadsContext.Provider>
    );
};