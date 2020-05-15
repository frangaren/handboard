import React from 'react';
import { AiFillCamera } from 'react-icons/ai';

import { Modal } from '../../Modal';

import './index.css'

export interface WebcamNoticeProps {
    show?: boolean;
};

export function WebcamNotice (props: WebcamNoticeProps){
    return (
        <Modal show={props.show}>
            <Modal.Title>Cámara necesaria</Modal.Title>
            <Modal.Content>
                <div className='WebcamNotice_Container'>
                    <div className='WebcamNotice_Icon'>
                        <AiFillCamera/>
                    </div>
                    <div className='WebcamNotice_Caption'>
                        Es necesaria una cámara para el correcto funcionamiento
                        de la aplicación.
                    </div>
                </div>
            </Modal.Content>
        </Modal>
    );
};