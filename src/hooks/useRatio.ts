import { Vector } from "../Vector";
import { useState, useEffect } from "react";

export function useRatio() {
    const [ratio, setRatio] = useState<Vector>(getRatio());

    function getRatio() {
        let ratioX = 1.0;
        let ratioY = 1.0;
        if (window.innerWidth > window.innerHeight) {
            ratioX = window.innerWidth / window.innerHeight;
        } else {
            ratioY = window.innerHeight / window.innerWidth;
        }
        return new Vector(ratioX, ratioY);
    }

    useEffect(() => {
        const onResize = () => setRatio(getRatio());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    });

    return ratio;
}