import React from 'react';
import { InteractionManager } from './InteractionManager';

export interface Position {
    x: number,
    y: number,
};

export type InteractionContextValue = InteractionManager | undefined;

export const InteractionContext = React.createContext<InteractionContextValue>(
    undefined
);