import React, { useEffect, forwardRef, Ref } from 'react';
import { Modal } from '../Modal';
import { interactive } from '../interaction/Interactive';

import './index.css';
import { ModelStoreManagerRegistry } from '@tensorflow/tfjs-core/dist/io/model_management';

export interface ColorDialogProps {
    value?: string,
    onChange?: (newValue: string) => void,
    show?: boolean
};

export function ColorDialog (props: ColorDialogProps) {
    const colors = [
        '#374047',
        '#98a1a8',
        '#cfd3d7',
        '#f9f9fa',
        '#2d8fd5',
        '#7780e4',
        '#a172e3',
        '#d153dd',
        '#dd57a5',
        '#df5f6a',
        '#d36d24',
        '#978b00',
        '#599900',
        '#0d9f00',
        '#009e42',
        '#009a8d'
    ];
    return (
        <Modal
            show = {props.show}
        >
            <Modal.Title>Selector de color</Modal.Title>
            <Modal.Content>
                <div className='ColorDialog_Container'>
                {
                    colors.map(color => (
                        <ColorDialogSample
                            key = {color}
                            value = {color}
                            selected = {color === props.value}
                            interactionPriority = {2}
                            onInteractStart = {() => {
                                if (props.onChange !== undefined) {
                                    props.onChange(color)
                                }
                            }}
                        />
                    ))
                }
                </div>
            </Modal.Content>
        </Modal>
    );
};

interface ColorDialogSampleProps {
    value?: string,
    selected?: boolean,
};

const ColorDialogSample = interactive<ColorDialogSampleProps, HTMLDivElement>(forwardRef(
        function (props: ColorDialogSampleProps, ref: Ref<HTMLDivElement>) {
        const selectedClass = props.selected?'ColorDialog_Sample_Selected':'';
        return (
            <div
                ref = {ref}
                className = {
                    `ColorDialog_Sample ${selectedClass}`
                }
            >
                <div
                    style={{
                        'backgroundColor': props.value ?? '#000000'
                    }}
                >
                </div>
            </div>
        )
    }
));