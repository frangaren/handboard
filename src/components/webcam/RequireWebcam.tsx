import React, { useContext } from 'react';
import { WebcamNotice } from './WebcamNotice';
import { WebcamContext } from './WebcamContext';

export interface RequireWebcamProps {
    children?: React.ReactNode,
};

export function RequireWebcam(props: RequireWebcamProps) {
    const webcam = useContext(WebcamContext);
    return (
        <React.Fragment>
            <WebcamNotice show={webcam == null} />
            {props.children}
        </React.Fragment>
    );
};