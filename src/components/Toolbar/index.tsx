import React, { ReactNode } from "react";
import { Button } from './Button';

import './index.css';

export interface ToolbarProps {
    children?: ReactNode,
    horizontal?: boolean,
    vertical?: boolean,
    top?: string,
    left?: string,
};

export function Toolbar (props: ToolbarProps) {
    const className = props.vertical ? 'Toolbar_Vertical' : 'Toolbar_Horizontal';
    return (
        <div
            className = {`Toolbar ${className}`}
            style = {{
                top: props.top ?? '0',
                left: props.left ?? '0',
            }}
        >
            {props.children}
        </div>
    );
};

Toolbar.Button = Button;