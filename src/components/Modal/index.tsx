import React, { useContext } from 'react';
import { animated, useTransition } from 'react-spring';
import { AiFillCloseCircle } from 'react-icons/ai';

import './index.css'

interface ModalContextValue {
    closeable: boolean,
    onClose?: () => void,
};

const default_context_value : ModalContextValue = {
    closeable: false,
    onClose: undefined
};

const ModalContext = React.createContext(default_context_value);

export interface ModalProps {
    show?: boolean,
    children?: React.ReactNode,
    closeable?: boolean,
    onClose?: () => void,
};

export function Modal(props: ModalProps) {
    const transition = useTransition(props.show ?? false, null, {
        from: { opacity: 0.0},
        enter: { opacity: 1.0},
        leave: { opacity: 0.0},
    });
    return (
        <ModalContext.Provider
            value={{
                closeable: props.closeable || default_context_value.closeable,
                onClose: props.onClose || default_context_value.onClose
            }}
        >
        {
            transition.map(({ item, key, props: style }) => item && (
                <animated.div
                    key={key}
                    className='Modal_Container'
                    style={style}
                    onClick={props.onClose}
                >
                    <ModalWindow show={props.show}>
                        {props.children}
                    </ModalWindow>
                </animated.div>
            ))
        }
        </ModalContext.Provider>
    );
};

interface ModalWindowProps {
    show?: boolean,
    children?: React.ReactNode,
};

function ModalWindow (props: ModalWindowProps) {
    const transition = useTransition(props.show ?? false, null, {
        from: { transform: 'scale(0.0)' },
        enter: { transform: 'scale(1.0)' },
        leave: { transform: 'scale(0.0)' },
    });
    return (<React.Fragment>{
        transition.map(({ item, key, props: style }) => item && (
            <animated.div
                key={key}
                className='Modal_Window'
                style={style}
                onClick={(event) => { event.stopPropagation() }}
            >
                {props.children}
            </animated.div>
        ))
    }</React.Fragment>);
};

export interface ModalTitleProps {
    children: React.ReactNode,
};

const Title = function (props: ModalTitleProps) {
    const { closeable, onClose } = useContext(ModalContext);
    return (
        <div className='Modal_TitleBar'>
            <div className='Modal_Title'>
                {props.children}
            </div>
            {
                closeable && (
                    <div
                        className='Modal_Close'
                        onClick={onClose}
                    >
                        <AiFillCloseCircle/>
                    </div>
                )
            }
        </div>
    );
};
Modal.Title = Title;

export interface ModalContentProps {
    children: React.ReactNode,
};

const Content = function(props: ModalContentProps) {
    return (
        <div
            className='Modal_Content'
        >
            {props.children}
        </div>
    );
};
Modal.Content = Content;