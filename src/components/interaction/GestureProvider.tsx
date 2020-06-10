import React, { useContext, useEffect, useState } from 'react';

import { SmoothHandContext } from '../pose/SmoothHandContext';
import { GamepadInputContext } from '../gamepads/GamepadInputContext';
import {
    GestureContext,
    Position,
} from './GestureContext';

export interface GestureProviderProps {
    children?: React.ReactNode,
}

export function GestureProvider (props: GestureProviderProps) {
    const hands = useContext(SmoothHandContext);
    const input = useContext(GamepadInputContext);
    const [leftHandPosition, setLeftHandPosition] =
        useState<Position | undefined>(undefined);
    const [rightHandPosition, setRightHandPosition] =
        useState<Position | undefined>(undefined);
    const [leftHandAction, setLeftHandAction] =
        useState<'hover' | 'grab' | 'interact'>('hover');
    const [rightHandAction, setRightHandAction] =
        useState<'hover' | 'grab' | 'interact'>('hover');
    useEffect(() => {
        if (hands !== undefined) {
            setLeftHandPosition(hands.leftHand);
            setRightHandPosition(hands.rightHand);
        }
    }, [hands]);
    useEffect(() => {
        if (input !== undefined) {
            if (input.buttons?.[4]) {
                setLeftHandAction('interact');
            } else if (input.buttons?.[6]) {
                setLeftHandAction('grab');
            } else {
                setLeftHandAction('hover');
            }
            if (input.buttons?.[5]) {
                setRightHandAction('interact');
            } else if (input.buttons?.[7]) {
                setRightHandAction('grab');
            } else {
                setRightHandAction('hover');
            }
        } else {
            setLeftHandAction('hover');
            setRightHandAction('hover');
        }
    }, [input]);
    return (
        <GestureContext.Provider
            value={{
                rightHand: {
                    position: rightHandPosition,
                    action: rightHandAction,
                },
                leftHand: {
                    position: leftHandPosition,
                    action: leftHandAction,
                }
            }}
        >
            {props.children}
        </GestureContext.Provider>
    );
}