import React, { useContext, useState } from 'react';

import { GestureContext } from '../GestureContext';
import { HandCursor } from '../HandCursor';

import './index.css';

export interface PoseCursorProps {};

export function PoseCursor (props: PoseCursorProps) {
    const gesture = useContext(GestureContext);
    return (
        <div id = 'PoseCursor_Container'>
            <SingleCursor
                invert
                position={gesture.leftHand.position}
                action={gesture.leftHand.action}
                show={!!gesture.leftHand.position}
            />
            <SingleCursor
                position={gesture.rightHand.position}
                action={gesture.rightHand.action}
                show={!!gesture.rightHand.position}
            />
        </div>
    );
};

export type Action = 'hover' | 'interact' | 'grab';

const actionFingers = {
    hover: {
        thumb: true,
        index: true,
        middle: true,
        ring: true,
        pinky: true,
    },
    interact: {
        thumb: true,
        index: true,
        middle: false,
        ring: false,
        pinky: false,
    },
    grab: {
        thumb: false,
        index: false,
        middle: false,
        ring: false,
        pinky: false,
    },
};

interface Position {
    x: number,
    y: number,
};

interface HandCursorProps {
    show?: boolean,
    invert?: boolean,
    position?: Position,
    action?: Action,
};

function SingleCursor(props: HandCursorProps) {
    const [lastPosition, setLastPosition] = useState({
        x: 0.5,
        y: 0.5,
    });
    const x = props.position?.x ?? lastPosition.x;
    const y = props.position?.y ?? lastPosition.y;
    if (x !== lastPosition.x || y !== lastPosition.y) {
        setLastPosition({
            x: x,
            y: y,
        });
    }
    return (
        <div
            className='PoseCursor_Hand'
            style={{
                top: `calc(${y * 100}vh - 32px/2)`,
                left: `calc(${x * 100}vw - 32px/2)`,
                opacity: (props.show) ? 1.0 : 0.0,
            }}
        >
            <HandCursor
                invert={props.invert}
                width='32px'
                height='32px'
                {...actionFingers[props.action ?? 'hover']}
            />
        </div>
    );
};