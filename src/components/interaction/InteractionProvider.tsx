import React, { useContext, useEffect, useState } from 'react';

import { InteractionContext } from './InteractionContext';
import { GestureContext } from './GestureContext';
import { InteractionManager } from './InteractionManager';

export interface InteractionProviderProps {
    children?: React.ReactNode,
}

export function InteractionProvider(props: InteractionProviderProps) {
    const gestures = useContext(GestureContext);
    const [interaction, ] = useState(new InteractionManager());
    useEffect(() => {
        interaction.raiseEventsFor(gestures);
    }, [gestures, interaction]);
    return (
        <InteractionContext.Provider value={interaction}>
            {props.children}
        </InteractionContext.Provider>
    );
}