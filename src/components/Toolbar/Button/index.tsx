import React, { forwardRef, ReactNode, Ref } from "react";
import { interactive } from "../../interaction/Interactive";

import './index.css';

export interface ButtonProps {
    children?: ReactNode,
    active?: boolean,
    color?: string,
};

export const Button = interactive<ButtonProps, HTMLDivElement>(forwardRef(
    (props:ButtonProps, ref:Ref<HTMLDivElement>) => {
        const active = props.active ? 'Toolbar_Button_Active' : '';
        return (
            <div
                ref={ref}
                className={`Toolbar_Button ${active}`}
                style={{
                    'color': props.color
                }}
            >
                {props.children}
            </div>
        );
    }
));