import React, { useState, useEffect } from 'react';
import { load, ModelConfig } from '@tensorflow-models/posenet';

import { PoseNetContext, PoseNetContextValue } from './PoseNetContext';

export interface PoseNetProviderProps extends ModelConfig {
    children?: React.ReactNode,
};

export function PoseNetProvider (props: PoseNetProviderProps) {
    const [model, setModel] = useState<PoseNetContextValue>(undefined);
    useEffect(() => {
        let isSuscribed = true;
        const { children: _, ...configuration } = props;
        load(configuration)
            .then(new_model => {
                if (isSuscribed) {
                    setModel(new_model);
                }
            })
            .catch(console.error)
        return () => { isSuscribed = false };
    }, [props]);
    return (
        <PoseNetContext.Provider value={model}>
            {props.children}
        </PoseNetContext.Provider>
    );
};