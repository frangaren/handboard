import React, { useState } from 'react';
import { RiPencilLine, RiEraserLine, RiPaletteLine } from 'react-icons/ri';

import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';

export interface BoardProps {};

export function Board(props: BoardProps) {
    const [canvas, setCanvas] = useState<SVGSVGElement | null>(null);
    return (
        <>
            <Toolbar
                vertical
                top = 'calc(50vh - 120px)'
            >
                <Toolbar.Button
                    active
                    interactionPriority={1}
                >
                    <RiPencilLine size='1.8em' style={{
                        margin: '0'
                    }}/>
                </Toolbar.Button>
                <Toolbar.Button
                    interactionPriority={1}
                >
                    <RiEraserLine size='1.5em' style={{
                        margin: '3px'
                    }} />
                </Toolbar.Button>
                <Toolbar.Button
                    interactionPriority={1}
                >
                    <RiPaletteLine size='1.5em' style={{
                        margin: '3px'
                    }} />
                </Toolbar.Button>
            </Toolbar>
            <Canvas/>
            <Toolbar
                vertical
                top='calc(50vh - 120px)'
                left='calc(100vw - 160px)'
            >
                <Toolbar.Button
                    interactionPriority = {1}
                >
                    <RiPencilLine size='1.8em' style={{
                        margin: '0'
                    }} />
                </Toolbar.Button>
                <Toolbar.Button
                    interactionPriority={1}
                >
                    <RiEraserLine size='1.5em' style={{
                        margin: '3px'
                    }} />
                </Toolbar.Button>
                <Toolbar.Button
                    interactionPriority={1}
                >
                    <RiPaletteLine size='1.5em' style={{
                        margin: '3px'
                    }} />
                </Toolbar.Button>
            </Toolbar>
        </>
    );
};