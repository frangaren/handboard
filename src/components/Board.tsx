import React, { useState } from 'react';
import { RiPencilLine, RiEraserLine, RiPaletteLine } from 'react-icons/ri';
import { v4 as uuid } from 'uuid';
import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';
import { Vector, VectorLike } from '../Vector';
import { Transform } from '../Transform';
import { useRatioTransform } from '../hooks/useRatioTransform';
import { StrokeData } from './Stroke';


export type Tool = 'none' | 'pencil' | 'eraser' | 'color-picker';

export interface BoardProps {};

export function Board(props: BoardProps) {
    const [leftTool, setLeftTool] = useState<Tool>('none');
    const [rightTool, setRightTool] = useState<Tool>('none');
    const [leftGrabbing, setLeftGrabbing] = useState<boolean>(false);
    const [rightGrabbing, setRightGrabbing] = useState<boolean>(false);
    const [leftInteracting, setLeftInteracting] = useState<boolean>(false);
    const [rightInteracting, setRightInteracting] = useState<boolean>(false);
    const [leftStroke, setLeftStroke] = useState<StrokeData>({
        key: 'left-stroke',
        color: 'black',
        points: [],
    });
    const [rightStroke, setRightStroke] = useState<StrokeData>({
        key: 'right-stroke',
        color: 'black',
        points: [],
    });
    const [leftColor, setLeftColor] = useState<string>('#000000');
    const [rightColor, setRightColor] = useState<string>('#000000');
    const [strokes, setStrokes] = useState<StrokeData[]>();
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

    function startDraw(
        left: VectorLike | undefined,
        right: VectorLike | undefined
    ) {
        if (left !== undefined) {
            setLeftStroke({
                ...leftStroke,
                points: [transform.inv().transform(ratioTransform.transform(left))],
                color: leftColor,
            });
        }
        if (right !== undefined) {
            setRightStroke({
                ...rightStroke,
                points: [transform.inv().transform(ratioTransform.transform(right))],
                color: rightColor,
            });
        }
    }

    function draw(
        left: VectorLike | undefined,
        right: VectorLike | undefined
    ) {
        if (left !== undefined && leftInteracting) {
            setLeftStroke({
                ...leftStroke,
                points: [...leftStroke.points, transform.inv().transform(ratioTransform.transform(left))],
            });
        }
        if (right !== undefined && rightInteracting) {
            setRightStroke({
                ...rightStroke,
                points: [...rightStroke.points, transform.inv().transform(ratioTransform.transform(right))],
            });
        }
    }

    function stopDraw(
        left: VectorLike | undefined,
        right: VectorLike | undefined
    ) {
        const newStrokes = [];
        if (left !== undefined && leftInteracting) {
            if (leftStroke.points.length > 0) {
                newStrokes.push({
                    ...leftStroke,
                    key: uuid(),
                    points: [...leftStroke.points, transform.inv().transform(ratioTransform.transform(left))],
                });
                setLeftStroke({
                    ...leftStroke,
                    points: [],
                    color: leftColor,
                });
            }
        }
        if (right !== undefined && rightInteracting) {
            if (rightStroke.points.length > 0) {
                newStrokes.push({
                    ...rightStroke,
                    key: uuid(),
                    points: [...rightStroke.points, transform.inv().transform(ratioTransform.transform(right))],
                });
                setRightStroke({
                    ...rightStroke,
                    points: [],
                    color: rightColor,
                });
            }
        }
        if (newStrokes.length > 0) {
            setStrokes([...(strokes ?? []), ...newStrokes]);
        }
    }

    function erase(
        left: VectorLike | undefined,
        right: VectorLike | undefined
    ) {
        if (strokes) {
            const newStrokes = strokes
            if (left !== undefined) {
                const element = document.elementFromPoint(
                    left.x * window.innerWidth,
                    left.y * window.innerHeight,
                );
                if (element !== null && element.getAttribute('stroke-id') !== null) {
                    const key = element.getAttribute('stroke-id');
                    for (let i = 0; i < newStrokes.length; i++) {
                        if (newStrokes[i].key === key) {
                            newStrokes.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            if (right !== undefined) {
                const element = document.elementFromPoint(
                    right.x * window.innerWidth,
                    right.y * window.innerHeight,
                );
                if (element !== null && element.getAttribute('stroke-id') !== null) {
                    const key = element.getAttribute('stroke-id');
                    for (let i = 0; i < newStrokes.length; i++) {
                        if (newStrokes[i].key === key) {
                            newStrokes.splice(i, 1);
                            break;
                        }
                    }
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
                strokes={[
                    leftStroke,
                    rightStroke,
                    ...(strokes ?? [])
                ]}
                transform={transform}
                onGrabStart={startTransform}
                onHandMove={(
                    left: VectorLike | undefined,
                    right: VectorLike | undefined
                ) => {
                    updateTransform(left, right);
                    if (leftInteracting || rightInteracting) {
                        if (leftTool === 'pencil' || rightTool === 'pencil') {
                            draw(
                                (leftInteracting && leftTool === 'pencil') ? left : undefined,
                                (rightInteracting && rightTool === 'pencil') ? right : undefined
                            );
                        }
                        if (leftTool === 'eraser' || rightTool === 'eraser') {
                            erase(
                                (leftInteracting && leftTool === 'eraser') ? left : undefined,
                                (rightInteracting && rightTool === 'eraser') ? right : undefined
                            );
                        }
                    }
                }}
                onGrabStop={stopTransform}
                onInteractStart={(
                    left: VectorLike | undefined,
                    right: VectorLike | undefined
                )=>{
                    if (leftTool === 'pencil' || rightTool === 'pencil') {
                        startDraw(
                            (leftTool === 'pencil') ? left : undefined,
                            (rightTool === 'pencil') ? right : undefined
                        );
                    }
                    if (left !== undefined) {
                        setLeftInteracting(true);
                    }
                    if (right !== undefined) {
                        setRightInteracting(true);
                    }
                }}
                onInteractStop={(
                    left: VectorLike | undefined,
                    right: VectorLike | undefined
                )=>{
                    if (leftTool === 'pencil' || rightTool === 'pencil') {
                        stopDraw(
                            (leftTool === 'pencil') ? left : undefined,
                            (rightTool === 'pencil') ? right : undefined
                        );
                    }
                    if (left !== undefined) {
                        setLeftInteracting(false);
                    }
                    if (right !== undefined) {
                        setRightInteracting(false);
                    }
                }}
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