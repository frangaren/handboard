import React from 'react';
import { PoseNet } from '@tensorflow-models/posenet';

export type PoseNetContextValue = PoseNet| undefined;

export const PoseNetContext =
    React.createContext<PoseNetContextValue>(undefined);