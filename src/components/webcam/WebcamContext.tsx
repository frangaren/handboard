import React from 'react';

export type WebcamContextValue = MediaStream | undefined;

export const WebcamContext = React.createContext<WebcamContextValue>(undefined);