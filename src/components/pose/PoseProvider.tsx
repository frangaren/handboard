import React, { useContext, useState, useEffect } from 'react';
import { PoseContext, PoseContextValue } from './PoseContext';
import { PoseNetContext } from './model/PoseNetContext';
import { WebcamContext } from '../webcam/WebcamContext';

export interface PoseProviderProps {
    children?: React.ReactNode,
    pollingInterval?: number,
    normalized?: boolean
};

export function PoseProvider (props: PoseProviderProps) {
    const [pose, setPose] = useState<PoseContextValue>(undefined);
    const [video] = useState<HTMLVideoElement>(
        document.createElement('video')
    );
    video.autoplay = true;
    const model = useContext(PoseNetContext);
    const webcam = useContext(WebcamContext);
    useEffect(() => {
        if (model) {
            video.width = model.inputResolution[1];
            video.height = model.inputResolution[0];
        }
    }, [model, video])
    useEffect(() => {
        if (webcam && video) {
            video.srcObject = webcam;
        }
    }, [webcam, video]);
    useEffect(() => {
        if (model) {
            let isSuscribed = true;
            const interval = setInterval(() => {
                if (video.readyState >= 2) {
                    model.estimateMultiplePoses(video, {
                        flipHorizontal: true,
                        maxDetections: 1,
                    })
                    .then(poses => {
                        if (isSuscribed && poses[0] !== undefined) {
                            const pose = poses[0];
                            const width = model.inputResolution[1];
                            const height = model.inputResolution[0];
                            if (props.normalized) {
                                pose.keypoints.forEach(keypoint => {
                                    keypoint.position.x = ((keypoint.position.x / width) - 0) / 1.0;
                                    keypoint.position.y = ((keypoint.position.y / height) - 0) / 1.0;
                                });
                            }
                            setPose(pose);
                        }
                    })
                    .catch(console.error)
                }
            }, props.pollingInterval ?? 50);
            return () => {
                clearInterval(interval);
                isSuscribed = false;
            }
        }
    }, [props.pollingInterval, props.normalized, model, video]);
    return (
        <PoseContext.Provider value={pose}>
            {props.children}
        </PoseContext.Provider>
    );
};