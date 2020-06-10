import React from 'react';
import { useSpring, animated } from 'react-spring';

export interface HandCursorProps {
    invert?: boolean,
    thumb?: boolean,
    index?: boolean,
    middle?: boolean,
    ring?: boolean,
    pinky?: boolean,
    width?: string,
    height?: string,
};

export function HandCursor (props: HandCursorProps) {
    const path = useSpring({
        d: `
            M 18 37
                l 0 ${(props.index) ? -25.0 : -3.0}
                c 0 -3 2 -5 5 -5 c 3 0 5 2 5 5
            L 28 37
                l 0 ${(props.middle) ? -30.0 : -4.0}
                c 0 -3 2 -5 5 -5 c 3 0 5 2 5 5
            L 38 37
                l 0 ${(props.ring) ? -25.0 : -3.0}
                c 0 -3 2 -5 5 -5 c 3 0 5 2 5 5
            L 48 37
                l 0 ${(props.pinky) ? -20.0 : 0.0}
                c 0 -3 2 -5 5 -5 c 3 0 5 2 5 5
            L 58 37 l 0 15 c 0 0 0 20 -20 20 l -10 0 c 0 0 -10 0 -15 -10
            L 13 62
                s 0 0 ${(props.thumb) ? -15.0 : -5.0}
                ${(props.thumb) ? -20.0 : -10.0}
                c 0 0 -2.5 -5 3 -7 c 0 0 3 -1 7 3
            S 18 49 18 41
            Z
        `
    });
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 65 75"
            width={props.width ?? '32px'}
            height={props.height ?? '32px'}
        >
            <animated.path
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="3"
                strokeLinejoin="round"
                transform={
                    (props.invert) ? "translate(65, 0) scale(-1, 1)" : undefined
                }
                d={path.d}
            />
        </svg>
    );
};