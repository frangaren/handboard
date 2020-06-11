import { VectorLike, Vector } from '../../Vector';
import { GestureContextValue, HandAction } from './GestureContext';

export class InteractionManager {

    private regions: InteractiveRegion[][];
    private leftFocus?: InteractiveRegion;
    private rightFocus?: InteractiveRegion;
    private leftAction: HandAction;
    private rightAction: HandAction;

    constructor() {
        this.regions = [];
        this.leftAction = 'hover';
        this.rightAction = 'hover';
    }

    addRegion(priority: number = 0) : InteractiveRegion {
        if (this.regions[priority] === undefined) {
            this.regions[priority] = [];
        }
        const region = new InteractiveRegion();
        this.regions[priority].push(region);
        return region;
    }

    removeRegion(region: InteractiveRegion): void {
        for (let i = 0; i < this.regions.length; i++) {
            if (this.regions[i] !== undefined) {
                for (let j = 0; j < this.regions.length; j++) {
                    if (this.regions[i][j] === region) {
                        if (this.leftFocus === region) {
                            this.leftFocus = undefined;
                        }
                        if (this.rightFocus === region) {
                            this.rightFocus = undefined;
                        }
                        this.regions[i].splice(j, 1);
                        return;
                    }
                }
            }
        }
    }

    regionAtPoint(point?: VectorLike): InteractiveRegion | undefined {
        if (point === undefined) {
            return undefined;
        }
        const windowSize = new Vector(window.innerWidth, window.innerHeight);
        const windowPoint = Vector.prod(point, windowSize);
        for (let i = this.regions.length - 1; i >= 0; i--) {
            if (this.regions[i] !== undefined) {
                for (let j = 0; j < this.regions[i].length; j++) {
                    if (this.regions[i][j].contains(windowPoint)) {
                        return this.regions[i][j];
                    }
                }
            }
        }
        return undefined;
    }

    raiseEventsFor(state: GestureContextValue) {
        const oldLeftFocus = this.leftFocus;
        const oldRightFocus = this.rightFocus
        const oldLeftAction = this.leftAction;
        const oldRightAction = this.rightAction;
        const newLeftFocus = this.regionAtPoint(state.leftHand.position);
        const newRightFocus = this.regionAtPoint(state.rightHand.position);
        const newLeftAction = state.leftHand.action;
        const newRightAction = state.rightHand.action;
        // Check for onHandEnter, onHandLeave and onHandMove
        if (newLeftFocus !== oldLeftFocus || newRightFocus !== oldRightFocus) { // One is onHandEnter and onHandLeave
            if (newLeftFocus !== oldLeftFocus && newRightFocus !== oldRightFocus) { // Both are onHandEnter and onHandLeave
                if (oldLeftFocus === oldRightFocus) { // onHandLeave over same element
                    if (oldLeftAction === oldRightAction) {
                        if (oldLeftAction === 'interact') {
                            raise(
                                oldLeftFocus?.onInteractStop,
                                oldLeftFocus,
                                state.leftHand.position,
                                state.rightHand.position
                            );
                        } else if (oldLeftAction === 'grab') {
                            raise(
                                oldLeftFocus?.onGrabStop,
                                oldLeftFocus,
                                state.leftHand.position,
                                state.rightHand.position
                            );
                        }
                    } else {
                        if (oldLeftAction === 'interact') {
                            raise(
                                oldLeftFocus?.onInteractStop,
                                oldLeftFocus,
                                state.leftHand.position,
                                undefined
                            );
                        } else if (oldLeftAction === 'grab') {
                            raise(
                                oldLeftFocus?.onGrabStop,
                                oldLeftFocus,
                                state.leftHand.position,
                                undefined
                            );
                        }
                        if (oldRightAction === 'interact') {
                            raise(
                                oldRightFocus?.onInteractStop,
                                oldRightFocus,
                                undefined,
                                state.rightHand.position
                            );
                        } else if (oldRightAction === 'grab') {
                            raise(
                                oldRightFocus?.onGrabStop,
                                oldRightFocus,
                                undefined,
                                state.rightHand.position
                            );
                        }
                    }
                    raise(
                        oldLeftFocus?.onHandLeave,
                        oldLeftFocus,
                        state.leftHand.position,
                        state.rightHand.position
                    );
                } else { // onHandLeave over different elements
                    if (oldLeftAction === 'interact') {
                        raise(
                            oldLeftFocus?.onInteractStop,
                            oldLeftFocus,
                            state.leftHand.position,
                            undefined
                        );
                    } else if (oldLeftAction === 'grab') {
                        raise(
                            oldLeftFocus?.onGrabStop,
                            oldLeftFocus,
                            state.leftHand.position,
                            undefined
                        );
                    }
                    raise(
                        oldLeftFocus?.onHandLeave,
                        oldLeftFocus,
                        state.leftHand.position,
                        undefined
                    );
                    if (oldRightAction === 'interact') {
                        raise(
                            oldRightFocus?.onInteractStop,
                            oldRightFocus,
                            undefined,
                            state.rightHand.position
                        );
                    } else if (oldRightAction === 'grab') {
                        raise(
                            oldRightFocus?.onGrabStop,
                            oldRightFocus,
                            undefined,
                            state.rightHand.position
                        );
                    }
                    raise(
                        oldRightFocus?.onHandLeave,
                        oldRightFocus,
                        undefined,
                        state.rightHand.position
                    );
                }
                if (newLeftFocus === newRightFocus) { // onHandEnter over same element
                    raise(
                        newLeftFocus?.onHandEnter,
                        newLeftFocus,
                        state.leftHand.position,
                        state.rightHand.position
                    );
                    if (newLeftAction === newRightAction) {
                        if (newLeftAction === 'interact') {
                            raise(
                                newLeftFocus?.onInteractStart,
                                newLeftFocus,
                                state.leftHand.position,
                                state.rightHand.position
                            );
                        } else if (newLeftAction === 'grab') {
                            raise(
                                newLeftFocus?.onGrabStart,
                                newLeftFocus,
                                state.leftHand.position,
                                state.rightHand.position
                            );
                        }
                    } else {
                        if (newLeftAction === 'interact') {
                            raise(
                                newLeftFocus?.onInteractStart,
                                newLeftFocus,
                                state.leftHand.position,
                                undefined
                            );
                        } else if (newLeftAction === 'grab') {
                            raise(
                                newLeftFocus?.onGrabStart,
                                newLeftFocus,
                                state.leftHand.position,
                                undefined
                            );
                        }
                        if (newRightAction === 'interact') {
                            raise(
                                newRightFocus?.onInteractStart,
                                newRightFocus,
                                undefined,
                                state.rightHand.position
                            );
                        } else if (newRightAction === 'grab') {
                            raise(
                                newRightFocus?.onGrabStart,
                                newRightFocus,
                                undefined,
                                state.rightHand.position
                            );
                        }
                    }
                } else { // onHandEnter over different elements
                    raise(
                        newLeftFocus?.onHandEnter,
                        newLeftFocus,
                        state.leftHand.position,
                        undefined
                    );
                    if (newLeftAction === 'interact') {
                        raise(
                            newLeftFocus?.onInteractStart,
                            newLeftFocus,
                            state.leftHand.position,
                            undefined
                        );
                    } else if (newLeftAction === 'grab') {
                        raise(
                            newLeftFocus?.onGrabStart,
                            newLeftFocus,
                            state.leftHand.position,
                            undefined
                        );
                    }
                    raise(
                        newRightFocus?.onHandEnter,
                        newRightFocus,
                        undefined,
                        state.rightHand.position
                    );
                    if (newRightAction === 'interact') {
                        raise(
                            newRightFocus?.onInteractStart,
                            newRightFocus,
                            undefined,
                            state.rightHand.position
                        );
                    } else if (newRightAction === 'grab') {
                        raise(
                            newRightFocus?.onGrabStart,
                            newRightFocus,
                            undefined,
                            state.rightHand.position
                        );
                    }
                }
            } else { // onHandEnter and onHandLeave in one hand and onMove on the other
                if (oldLeftFocus === newLeftFocus) { // onHandEnter and onHandLeave on right and onMove on left
                    raise(
                        newLeftFocus?.onHandMove,
                        newLeftFocus,
                        state.leftHand.position,
                        undefined
                    );
                    if (oldLeftAction !== newLeftAction) {
                        if (oldLeftAction === 'interact') {
                            raise(
                                oldLeftFocus?.onInteractStop,
                                oldLeftFocus,
                                state.leftHand.position,
                                undefined
                            );
                        } else if (oldLeftAction === 'grab') {
                            raise(
                                oldLeftFocus?.onGrabStop,
                                oldLeftFocus,
                                state.leftHand.position,
                                undefined
                            );
                        }
                        if (newLeftAction === 'interact') {
                            raise(
                                newLeftFocus?.onInteractStart,
                                newLeftFocus,
                                state.leftHand.position,
                                undefined
                            );
                        } else if (newLeftAction === 'grab') {
                            raise(
                                newLeftFocus?.onGrabStart,
                                newLeftFocus,
                                state.leftHand.position,
                                undefined
                            );
                        }
                    }
                    if (oldRightAction === 'interact') {
                        raise(
                            oldRightFocus?.onInteractStop,
                            oldRightFocus,
                            undefined,
                            state.rightHand.position
                        );
                    } else if (oldRightAction === 'grab') {
                        raise(
                            oldRightFocus?.onGrabStop,
                            oldRightFocus,
                            undefined,
                            state.rightHand.position
                        );
                    }
                    raise(
                        oldRightFocus?.onHandLeave,
                        oldRightFocus,
                        undefined,
                        state.rightHand.position
                    );
                    raise(
                        newRightFocus?.onHandEnter,
                        newRightFocus,
                        undefined,
                        state.rightHand.position
                    );
                    if (newRightAction === 'interact') {
                        raise(
                            newRightFocus?.onInteractStart,
                            newRightFocus,
                            undefined,
                            state.rightHand.position
                        );
                    } else if (newRightAction === 'grab') {
                        raise(
                            newRightFocus?.onGrabStart,
                            newRightFocus,
                            undefined,
                            state.rightHand.position
                        );
                    }
                } else { // onHandEnter and onHandLeave on left and onMove on right
                    if (oldLeftAction === 'interact') {
                        raise(
                            oldLeftFocus?.onInteractStop,
                            oldLeftFocus,
                            state.leftHand.position,
                            undefined
                        );
                    } else if (oldLeftAction === 'grab') {
                        raise(
                            oldLeftFocus?.onGrabStop,
                            oldLeftFocus,
                            state.leftHand.position,
                            undefined
                        );
                    }
                    raise(
                        oldLeftFocus?.onHandLeave,
                        oldLeftFocus,
                        state.leftHand.position,
                        undefined
                    );
                    raise(
                        newLeftFocus?.onHandEnter,
                        newLeftFocus,
                        state.leftHand.position,
                        undefined
                    );
                    if (newLeftAction === 'interact') {
                        raise(
                            newLeftFocus?.onInteractStart,
                            newLeftFocus,
                            state.leftHand.position,
                            undefined
                        );
                    } else if (newLeftAction === 'grab') {
                        raise(
                            newLeftFocus?.onGrabStart,
                            newLeftFocus,
                            state.leftHand.position,
                            undefined
                        );
                    }
                    raise(
                        newRightFocus?.onHandMove,
                        newRightFocus,
                        undefined,
                        state.rightHand.position
                    );
                    if (oldRightAction !== newRightAction) {
                        if (oldRightAction === 'interact') {
                            raise(
                                oldRightFocus?.onInteractStop,
                                oldRightFocus,
                                undefined,
                                state.rightHand.position
                            );
                        } else if (oldRightAction === 'grab') {
                            raise(
                                oldRightFocus?.onGrabStop,
                                oldRightFocus,
                                undefined,
                                state.rightHand.position
                            );
                        }
                        if (newRightAction === 'interact') {
                            raise(
                                newRightFocus?.onInteractStart,
                                newRightFocus,
                                undefined,
                                state.rightHand.position
                            );
                        } else if (newRightAction === 'grab') {
                            raise(
                                newRightFocus?.onGrabStart,
                                newRightFocus,
                                undefined,
                                state.rightHand.position
                            );
                        }
                    }
                }
            }
        } else { // Both are onHandMove
            if (newLeftFocus === newRightFocus) { // onHandMove over same element
                raise(
                    newLeftFocus?.onHandMove,
                    newLeftFocus,
                    state.leftHand.position,
                    state.rightHand.position
                );
                if (oldLeftAction !== newLeftAction || oldRightAction !== newRightAction) {
                    if (oldLeftAction !== newLeftAction && oldRightAction !== newRightAction) {
                        if (oldLeftAction === oldRightAction) {
                            if (oldLeftAction === 'interact') {
                                raise(
                                    oldLeftFocus?.onInteractStop,
                                    oldLeftFocus,
                                    state.leftHand.position,
                                    state.rightHand.position
                                );
                            } else if (oldLeftAction === 'grab') {
                                raise(
                                    oldLeftFocus?.onGrabStop,
                                    oldLeftFocus,
                                    state.leftHand.position,
                                    state.rightHand.position
                                );
                            }
                        } else {
                            if (oldLeftAction === 'interact') {
                                raise(
                                    oldLeftFocus?.onInteractStop,
                                    oldLeftFocus,
                                    state.leftHand.position,
                                    undefined
                                );
                            } else if (oldLeftAction === 'grab') {
                                raise(
                                    oldLeftFocus?.onGrabStop,
                                    oldLeftFocus,
                                    state.leftHand.position,
                                    undefined
                                );
                            }
                            if (oldRightAction === 'interact') {
                                raise(
                                    oldRightFocus?.onInteractStop,
                                    oldRightFocus,
                                    undefined,
                                    state.rightHand.position
                                );
                            } else if (oldRightAction === 'grab') {
                                raise(
                                    oldRightFocus?.onGrabStop,
                                    oldRightFocus,
                                    undefined,
                                    state.rightHand.position
                                );
                            }
                        }
                        if (newLeftAction === newRightAction) {
                            if (newLeftAction === 'interact') {
                                raise(
                                    newLeftFocus?.onInteractStart,
                                    newLeftFocus,
                                    state.leftHand.position,
                                    state.rightHand.position
                                );
                            } else if (newLeftAction === 'grab') {
                                raise(
                                    newLeftFocus?.onGrabStart,
                                    newLeftFocus,
                                    state.leftHand.position,
                                    state.rightHand.position
                                );
                            }
                        } else {
                            if (newLeftAction === 'interact') {
                                raise(
                                    newLeftFocus?.onInteractStart,
                                    newLeftFocus,
                                    state.leftHand.position,
                                    undefined
                                );
                            } else if (newLeftAction === 'grab') {
                                raise(
                                    newLeftFocus?.onGrabStart,
                                    newLeftFocus,
                                    state.leftHand.position,
                                    undefined
                                );
                            }
                            if (newRightAction === 'interact') {
                                raise(
                                    newRightFocus?.onInteractStart,
                                    newRightFocus,
                                    undefined,
                                    state.rightHand.position
                                );
                            } else if (newRightAction === 'grab') {
                                raise(
                                    newRightFocus?.onGrabStart,
                                    newRightFocus,
                                    undefined,
                                    state.rightHand.position
                                );
                            }
                        }
                    } else {
                        if (oldLeftAction !== newLeftAction) {
                            if (oldLeftAction === 'interact') {
                                raise(
                                    oldLeftFocus?.onInteractStop,
                                    oldLeftFocus,
                                    state.leftHand.position,
                                    undefined
                                );
                            } else if (oldLeftAction === 'grab') {
                                raise(
                                    oldLeftFocus?.onGrabStop,
                                    oldLeftFocus,
                                    state.leftHand.position,
                                    undefined
                                );
                            }
                            if (newLeftAction === 'interact') {
                                raise(
                                    newLeftFocus?.onInteractStart,
                                    newLeftFocus,
                                    state.leftHand.position,
                                    undefined
                                );
                            } else if (newLeftAction === 'grab') {
                                raise(
                                    newLeftFocus?.onGrabStart,
                                    newLeftFocus,
                                    state.leftHand.position,
                                    undefined
                                );
                            }
                        }
                        if (oldRightAction !== newRightAction) {
                            if (oldRightAction === 'interact') {
                                raise(
                                    oldRightFocus?.onInteractStop,
                                    oldRightFocus,
                                    undefined,
                                    state.rightHand.position
                                );
                            } else if (oldRightAction === 'grab') {
                                raise(
                                    oldRightFocus?.onGrabStop,
                                    oldRightFocus,
                                    undefined,
                                    state.rightHand.position
                                );
                            }
                            if (newRightAction === 'interact') {
                                raise(
                                    newRightFocus?.onInteractStart,
                                    newRightFocus,
                                    undefined,
                                    state.rightHand.position
                                );
                            } else if (newRightAction === 'grab') {
                                raise(
                                    newRightFocus?.onGrabStart,
                                    newRightFocus,
                                    undefined,
                                    state.rightHand.position
                                );
                            }
                        }
                    }
                }
            } else { // onHandMove over different elements
                raise(
                    newLeftFocus?.onHandMove,
                    newLeftFocus,
                    state.leftHand.position,
                    undefined
                );
                if (oldLeftAction !== newLeftAction) {
                    if (oldLeftAction === 'interact') {
                        raise(
                            oldLeftFocus?.onInteractStop,
                            oldLeftFocus,
                            state.leftHand.position,
                            undefined
                        );
                    } else if (oldLeftAction === 'grab') {
                        raise(
                            oldLeftFocus?.onGrabStop,
                            oldLeftFocus,
                            state.leftHand.position,
                            undefined
                        );
                    }
                    if (newLeftAction === 'interact') {
                        raise(
                            newLeftFocus?.onInteractStart,
                            newLeftFocus,
                            state.leftHand.position,
                            undefined
                        );
                    } else if (newLeftAction === 'grab') {
                        raise(
                            newLeftFocus?.onGrabStart,
                            newLeftFocus,
                            state.leftHand.position,
                            undefined
                        );
                    }
                }
                raise(
                    newRightFocus?.onHandMove,
                    newRightFocus,
                    undefined,
                    state.rightHand.position
                );
                if (oldRightAction !== newRightAction) {
                    if (oldRightAction === 'interact') {
                        raise(
                            oldRightFocus?.onInteractStop,
                            oldRightFocus,
                            undefined,
                            state.rightHand.position
                        );
                    } else if (oldRightAction === 'grab') {
                        raise(
                            oldRightFocus?.onGrabStop,
                            oldRightFocus,
                            undefined,
                            state.rightHand.position
                        );
                    }
                    if (newRightAction === 'interact') {
                        raise(
                            newRightFocus?.onInteractStart,
                            newRightFocus,
                            undefined,
                            state.rightHand.position
                        );
                    } else if (newRightAction === 'grab') {
                        raise(
                            newRightFocus?.onGrabStart,
                            newRightFocus,
                            undefined,
                            state.rightHand.position
                        );
                    }
                }
            }
        }
        this.leftAction = newLeftAction;
        this.rightAction = newRightAction;
        this.leftFocus = newLeftFocus;
        this.rightFocus = newRightFocus;
    }
};

function raise(
    f: ((...args: any[]) => any) | undefined,
    thisArg: any,
    ...args: any[]
): any | undefined {
    if (f !== undefined) {
        return f.call(thisArg, ...args);
    }
    return undefined;
}

export type OnHandEnterEventHandler =
    (left: VectorLike | undefined, right: VectorLike | undefined) => void;
export type OnHandMoveEventHandler =
    (left: VectorLike | undefined, right: VectorLike | undefined) => void;
export type OnHandLeaveEventHandler =
    (left: VectorLike | undefined, right: VectorLike | undefined) => void;
export type OnInteractStartEventHandler =
    (left: VectorLike | undefined, right: VectorLike | undefined) => void;
export type OnInteractStopEventHandler =
    (left: VectorLike | undefined, right: VectorLike | undefined) => void;
export type OnGrabStartEventHandler =
    (left: VectorLike | undefined, right: VectorLike | undefined) => void;
export type OnGrabStopEventHandler =
    (left: VectorLike | undefined, right: VectorLike | undefined) => void;

export class InteractiveRegion {

    element?: Element;

    onHandEnter?: OnHandEnterEventHandler;
    onHandMove?: OnHandMoveEventHandler;
    onHandLeave?: OnHandLeaveEventHandler;
    onInteractStart?: OnInteractStartEventHandler;
    onInteractStop?: OnInteractStopEventHandler;
    onGrabStart?: OnGrabStartEventHandler;
    onGrabStop?: OnGrabStopEventHandler;

    contains(point: VectorLike): boolean {
        if (this.element === undefined) {
            return false;
        }
        const rect = this.element.getBoundingClientRect();
        const size = new Vector(rect.width, rect.height);
        const diff = Vector.sub(point, rect);
        return diff.x >= 0 && diff.y >= 0 && diff.x < size.x && diff.y < size.y;
    }

};