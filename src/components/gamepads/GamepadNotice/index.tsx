import React from 'react';
import { FaGamepad } from 'react-icons/fa';

import { Modal } from '../../Modal';

import './index.css'

export interface GamepadNoticeProps {
    show?: boolean;
};

export function GamepadNotice(props: GamepadNoticeProps) {
    return (
        <Modal show={props.show}>
            <Modal.Title>Mando necesario</Modal.Title>
            <Modal.Content>
                <div className='GamepadNotice_Container'>
                    <div className='GamepadNotice_Icon'>
                        <FaGamepad />
                    </div>
                    <div className='GamepadNotice_Caption'>
                        Es necesario un mando para el correcto funcionamiento
                        de la aplicación.
                    </div>
                </div>
            </Modal.Content>
        </Modal>
    );
};