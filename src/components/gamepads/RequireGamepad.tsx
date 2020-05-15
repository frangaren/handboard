import React, { useContext } from 'react';
import { GamepadNotice } from './GamepadNotice';
import { GamepadsContext } from './GamepadsContext';

export interface RequireGamepadProps {
    children?: React.ReactNode,
};

export function RequireGamepad(props: RequireGamepadProps) {
    const gamepad = useContext(GamepadsContext);
    return (
        <React.Fragment>
            {props.children}
            <GamepadNotice show={!gamepad[0]} />
        </React.Fragment>
    );
};