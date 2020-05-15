import React, { useContext, useState, useEffect, useRef } from 'react';
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
                        if (isSuscribed) {
                            if (poses.length < 1) {
                                setPose(undefined);
                            } else {
                                const width = model.inputResolution[1];
                                const height = model.inputResolution[0];
                                let pose = poses[0];
                                if (props.normalized) {
                                    pose.keypoints.forEach(keypoint => {
                                        keypoint.position.x /= width;
                                        keypoint.position.y /= height;
                                    });
                                }
                                setPose(pose);
                            }
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