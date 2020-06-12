import React, {useContext, useState, useEffect} from 'react';

import { PoseContext } from './PoseContext';
import { Position, SmoothHandContext } from './SmoothHandContext';
import { VectorizedFilter } from '../../filter/VectorizedFilter';
import { OneEuroFilter } from '../../filter/OneEuroFilter';
import { VectorInversionFilter } from '../../filter/VectorInversionFilter';
import { DualizedVectorFilter } from '../../filter/DualizedVectorFilter';
import { DualVectorFilter } from '../../filter/DualVectorFilter';
import { VectorLike } from '../../Vector';

                                //mincutoff={0.5}
                                //beta={10.0}
                                //ddcutoff={0.005}

export interface SmoothHandProviderProps {
    children?: React.ReactNode,
    mincutoff?: number,
    beta?: number,
    ddcutoff?:number,
};

export function SmoothHandProvider (props: SmoothHandProviderProps) {
    const pose = useContext(PoseContext);
    const [inversionFilter, setInversionFilter] = useState<DualVectorFilter>(
        new VectorInversionFilter()
    );
    const [smoothFilter, setSmoothFilter] = useState<DualVectorFilter>(
        new DualizedVectorFilter(
            VectorizedFilter,
            OneEuroFilter,
            props.mincutoff,
            props.beta
        )
    );
    const [lastTime, setLastTime] = useState<number>(Date.now());
    const [hands, setHands] = useState<[Position, Position] | undefined>(
        undefined
    );

    useEffect(() => {
        setSmoothFilter(
            new DualizedVectorFilter(
                VectorizedFilter,
                OneEuroFilter,
                props.mincutoff,
                props.beta
            )
        );
    }, [props.mincutoff, props.beta]);


    useEffect(() => {
        if (pose === undefined) {
            return;
        }
        const t = Date.now()
        const dt = t - lastTime;
        let hands : [VectorLike, VectorLike] = [
            pose.keypoints[9].position,
            pose.keypoints[10].position,
        ];
        //hands = inversionFilter.filter(hands[0], hands[1], dt / 1000);
        hands = smoothFilter.filter(hands[0], hands[1], dt / 1000);
        setLastTime(t);
        setHands(hands);
    }, [pose, inversionFilter, smoothFilter]);
    return (
        <SmoothHandContext.Provider
            value={hands ? {
                leftHand: hands[0],
                rightHand: hands[1],
            } : undefined}
        >
            {props.children}
        </SmoothHandContext.Provider>
    );
};