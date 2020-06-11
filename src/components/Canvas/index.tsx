import React, { Ref, forwardRef } from 'react';
import { interactive } from '../interaction/Interactive';
import { useRatio } from '../../hooks/useRatio';
import { Transform } from '../../Transform';

import './index.css';

export interface CanvasProps {
    transform?: Transform,
};

export const Canvas = interactive<CanvasProps, SVGSVGElement>(forwardRef(
    (props: CanvasProps, ref: Ref<SVGSVGElement>) => {
        const ratio = useRatio();
        return (
            <svg
                className='Canvas'
                ref={ref}
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                viewBox={
                    `${-ratio.x} ${-ratio.y} ${ratio.x * 2} ${ratio.y * 2}`
                }
            >
                <g
                    transform={
                        (props.transform ?? Transform.id()).toString()
                    }
                >
                    <rect width='1' height='1' x='-0.5' y='-0.5' fill='red' />
                </g>
            </svg>
        );
    }
));