import React from 'react';

import { Modal } from '../../../Modal';
import { Spinner } from '../../../Spinner';

import './index.css';

export interface PoseNetProps {
    show?: boolean;
};

export function PoseNetNotice (props: PoseNetProps) {
    return (
        <Modal show={props.show}>
            <Modal.Title>Cargando...</Modal.Title>
            <Modal.Content>
                <div className='PoseNotice_Container'>
                    <div className='PoseNotice_Spinner'>
                        <Spinner size='100%' thickness='0.75em'/>
                    </div>
                    <div className='PoseNotice_Caption'>
                        Se está cargando el modelo de detección de poses.
                        Espere un momento.
                    </div>
                </div>
            </Modal.Content>
        </Modal>
    );
};