import React, { useContext } from 'react';
import { PoseNetNotice } from './PoseNetNotice';
import { PoseNetContext } from './PoseNetContext';

export interface RequirePoseNetProps {
    children?: React.ReactNode,
};

export function RequirePoseNet(props: RequirePoseNetProps) {
    const model = useContext(PoseNetContext);
    return (
        <React.Fragment>
            {props.children}
            <PoseNetNotice show={!model} />
        </React.Fragment>
    );
};