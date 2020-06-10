import React, { useContext } from 'react';
import { GamepadNotice } from './GamepadNotice';
import { GamepadsContext } from './GamepadsContext';

export interface RequireGamepadProps {
    children?: React.ReactNode,
};

export function RequireGamepad(props: RequireGamepadProps) {
    const gamepads = useContext(GamepadsContext);
    let show = true;
    for (const gamepad of gamepads) {
        if (gamepad !== null) {
            show = false;
            break;
        }
    }
    return (
        <React.Fragment>
            {props.children}
            <GamepadNotice show={show}/>
        </React.Fragment>
    );
};