import React, {useState, useEffect, Props} from 'react';

import { WebcamContextValue, WebcamContext } from './WebcamContext';

export interface WebcamProviderProps extends MediaStreamConstraints {
    children: React.ReactNode,
};

export function WebcamProvider (props: WebcamProviderProps) {
    const [webcam, setWebcam] = useState<WebcamContextValue>(undefined);
    useEffect(() => {
        let isSuscribed = true;
        if (navigator?.mediaDevices?.getUserMedia) {
            const {children: _, ...constraints} = props;
            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    if (isSuscribed) {
                        setWebcam(stream);
                    }
                })
                .catch(console.error);
        }
        return () => { isSuscribed = false };
    }, [props]);
    return (
        <WebcamContext.Provider value={webcam}>
            {props.children}
        </WebcamContext.Provider>
    );
};