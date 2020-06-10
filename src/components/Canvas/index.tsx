import React, { Ref, forwardRef } from 'react';
import { interactive } from '../interaction/Interactive';

import './index.css';

export interface CanvasProps {};

export const Canvas = interactive<CanvasProps, SVGSVGElement>(forwardRef(
    (props: CanvasProps, ref: Ref<SVGSVGElement>) => {
        return (
            <svg ref={ref}>
            </svg>
        );
    }
));