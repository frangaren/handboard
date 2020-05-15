import React from 'react';

import './index.css';

export interface SpinnerProps {
    size?: string,
    thickness?: string,
};

export function Spinner (props: SpinnerProps) {
    const size = props.size ?? '3em';
    const thickness = props.thickness ?? '0.5em';
    return (
        <div
            className='Spinner'
            style={{
                height: size,
                width: size,
                borderWidth: thickness,
            }}
        >
            .
        </div>
    );
};