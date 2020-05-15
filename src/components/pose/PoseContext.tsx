import React from 'react';
import { Pose } from '@tensorflow-models/posenet';

export type PoseContextValue = Pose | undefined;

export const PoseContext = React.createContext<PoseContextValue>(undefined);