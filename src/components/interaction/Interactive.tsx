import React, {
    useContext,
    useEffect,
    useState,
    ComponentType,
    Ref,
} from 'react';
import {
    OnHandEnterEventHandler,
    OnHandMoveEventHandler,
    OnHandLeaveEventHandler,
    OnInteractStartEventHandler,
    OnInteractStopEventHandler,
    OnGrabStartEventHandler,
    OnGrabStopEventHandler,
    InteractiveRegion
} from './InteractionManager';
import { InteractionContext } from './InteractionContext';

export interface InteractiveProps {
    interactionPriority?: number,
    onHandEnter?: OnHandEnterEventHandler,
    onHandMove?: OnHandMoveEventHandler,
    onHandLeave?: OnHandLeaveEventHandler,
    onInteractStart?: OnInteractStartEventHandler,
    onInteractStop?: OnInteractStopEventHandler,
    onGrabStart?: OnGrabStartEventHandler,
    onGrabStop?: OnGrabStopEventHandler,
}

export function interactive<P, Q extends Element>(Child: ComponentType<P & {ref: Ref<Q>}>) {
    return function Interactive(props: P & InteractiveProps) {
        const interaction = useContext(InteractionContext);
        const [region, setRegion] = useState<InteractiveRegion | undefined>(
            undefined
        );
        const [element, setElement] = useState<Q | null>(null);
        useEffect(() => {
            if (interaction !== undefined) {
                const oldInteraction = interaction;
                const newRegion = interaction.addRegion(
                    props.interactionPriority
                );
                newRegion.element = element ?? undefined;
                setRegion(newRegion);
                return () => {
                    oldInteraction?.removeRegion(newRegion);
                    setRegion(undefined);
                }
            }
        }, [interaction, props.interactionPriority]);
        useEffect(() => {
            if (region !== undefined) {
                region.onGrabStart = props.onGrabStart;
                region.onGrabStop = props.onGrabStop;
                region.onHandEnter = props.onHandEnter;
                region.onHandLeave = props.onHandLeave;
                region.onHandMove = props.onHandMove;
                region.onInteractStart = props.onInteractStart;
                region.onInteractStop = props.onInteractStop;
            }
        }, [
            region,
            props.onGrabStart,
            props.onGrabStop,
            props.onHandEnter,
            props.onHandLeave,
            props.onHandMove,
            props.onInteractStart,
            props.onInteractStop
        ]);
        useEffect(() => {
            if (region) {
                region.element = element ?? undefined;
            }
        }, [element]);
        return (
            <Child ref={setElement}  {...(props as P)}/>
        );
    };
};