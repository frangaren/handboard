import React, { useState } from 'react';
import { RiPencilLine, RiEraserLine, RiPaletteLine } from 'react-icons/ri';

import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';
import { Vector, VectorLike } from '../Vector';
import { Transform } from '../Transform';
import { useRatioTransform } from '../hooks/useRatioTransform';
import { HandAction } from './interaction/GestureContext';
import { start } from 'repl';

export type Tool = 'none' | 'pencil' | 'eraser' | 'color-picker';

export interface BoardProps {};

export function Board(props: BoardProps) {
    const [leftTool, setLeftTool] = useState<Tool>('none');
    const [rightTool, setRightTool] = useState<Tool>('none');
    const [leftGrabbing, setLeftGrabbing] = useState<boolean>(false);
    const [rightGrabbing, setRightGrabbing] = useState<boolean>(false);
    const ratioTransform = useRatioTransform();
    const [transform, setTransform] = useState<Transform>(Transform.id());
    const [oldTransform, setOldTransform] = useState<Transform>(Transform.id());
    const [lastLeftPosition, setLastLeftPosition] =
        useState<VectorLike>(new Vector());
    const [lastRightPosition, setLastRightPosition] =
        useState<VectorLike>(new Vector());
    const [canvas, setCanvas] = useState<SVGSVGElement | null>(null);

    function startTransform(
        left: VectorLike | undefined,
        right: VectorLike | undefined
    ) {
        if (left !== undefined) {
            setLastLeftPosition(left);
            setOldTransform(transform);
            setLeftGrabbing(true);
        }
        if (right !== undefined) {
            setLastRightPosition(right);
            setOldTransform(transform);
            setRightGrabbing(true);
        }
    }

    function stopTransform(
        left: VectorLike | undefined,
        right: VectorLike | undefined
    ) {
        if (left !== undefined) {
            setLeftGrabbing(false);
        }
        if (right !== undefined) {
            setRightGrabbing(false);
        }
    }

    function updateTransform(
        left: VectorLike | undefined,
        right: VectorLike | undefined
    ) {
        if (leftGrabbing && rightGrabbing) {
            if (left !== undefined && right !== undefined) {
                const newTransform = Transform.sequence(
                    oldTransform,
                    Transform.fromPoints(
                        ratioTransform.transform(lastLeftPosition),
                        ratioTransform.transform(lastRightPosition),
                        ratioTransform.transform(left),
                        ratioTransform.transform(right)
                    )
                )
                setTransform(newTransform);
                //setLastLeftPosition(left);
                //setLastRightPosition(right);
            } else {
                if (left !== undefined) {
                    setLastLeftPosition(left);
                }
                if (right !== undefined) {
                    setLastRightPosition(right);
                }
            }
        }
    }

    return (
        <>
            <Toolbar
                vertical
                top = 'calc(50vh - 120px)'
            >
                <Toolbar.Button
                    active={leftTool === 'pencil'}
                    interactionPriority={1}
                    onInteractStart={() => setLeftTool('pencil')}
                >
                    <RiPencilLine size='1.8em' style={{
                        margin: '0'
                    }}/>
                </Toolbar.Button>
                <Toolbar.Button
                    active={leftTool === 'eraser'}
                    interactionPriority={1}
                    onInteractStart={() => setLeftTool('eraser')}
                >
                    <RiEraserLine size='1.5em' style={{
                        margin: '3px'
                    }} />
                </Toolbar.Button>
                <Toolbar.Button
                    active={leftTool === 'color-picker'}
                    interactionPriority={1}
                    onInteractStart={() => setLeftTool('color-picker')}
                >
                    <RiPaletteLine size='1.5em' style={{
                        margin: '3px'
                    }} />
                </Toolbar.Button>
            </Toolbar>
            <Canvas
                transform={transform}
                onGrabStart={startTransform}
                onHandMove={(
                    left: VectorLike | undefined,
                    right: VectorLike | undefined
                ) => {
                    updateTransform(left, right);
                }}
                onGrabStop={stopTransform}
            />
            <Toolbar
                vertical
                top='calc(50vh - 120px)'
                left='calc(100vw - 160px)'
            >
                <Toolbar.Button
                    active={rightTool === 'pencil'}
                    interactionPriority={1}
                    onInteractStart={() => setRightTool('pencil')}
                >
                    <RiPencilLine size='1.8em' style={{
                        margin: '0'
                    }} />
                </Toolbar.Button>
                <Toolbar.Button
                    active={rightTool === 'eraser'}
                    interactionPriority={1}
                    onInteractStart={() => setRightTool('eraser')}
                >
                    <RiEraserLine size='1.5em' style={{
                        margin: '3px'
                    }} />
                </Toolbar.Button>
                <Toolbar.Button
                    active={rightTool === 'color-picker'}
                    interactionPriority={1}
                    onInteractStart={() => setRightTool('color-picker')}
                >
                    <RiPaletteLine size='1.5em' style={{
                        margin: '3px'
                    }} />
                </Toolbar.Button>
            </Toolbar>
        </>
    );
};