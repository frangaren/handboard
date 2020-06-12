import React, {} from 'react';
import { VectorLike } from '../Vector';

export interface StrokeData {
    key: string,
    color: string,
    points: VectorLike[],
};

export interface StrokeProps {
    value: StrokeData,
};

function pointsToD(points: VectorLike[]): string {
    if (points.length <= 0) {
        return '';
    }
    let path = 'M ' + points[0].x + ' ' + points[0].y;
    for (let i = 1; i < points.length; i++) {
        path += ' L ' + points[i].x + ' ' + points[i].y;
    }
    return path;
}

export function Stroke (props: StrokeProps) {
    return (
        <path
            stroke-id = {props.value.key}
            d = {pointsToD(props.value.points)}
            stroke = {props.value.color}
            strokeWidth = {0.05}
            strokeLinecap = 'round'
            strokeLinejoin = 'round'
            fill = 'none'
        />
    );
}