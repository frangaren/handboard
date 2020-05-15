import React, {useState, useEffect} from 'react';

import { WebcamContextValue, WebcamContext } from './WebcamContext';

export interface WebcamProviderProps extends MediaStreamConstraints {
    children: React.ReactNode,
};

export function WebcamProvider (props: WebcamProviderProps) {
    const { children, ...constraints } = props;
    const [webcam, setWebcam] = useState<WebcamContextValue>(undefined);
    useEffect(() => {
        let isSuscribed = true;
        if (navigator?.mediaDevices?.getUserMedia) {
            const promise = navigator.mediaDevices.getUserMedia(constraints);
            promise
                .then(stream => {
                    if (isSuscribed) {
                        setWebcam(stream);
                    }
                })
                .catch(console.error);
        }
        return () => { isSuscribed = false };
    }, [constraints]);
    return (
        <WebcamContext.Provider value={webcam}>
            {children}
        </WebcamContext.Provider>
    );
};