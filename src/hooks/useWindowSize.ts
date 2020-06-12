import { Vector } from "../Vector";
import { useState, useEffect } from "react";

export function useWindowSize() {
    const [size, setSize] = useState<Vector>(getSize());

    function getSize() {
        return new Vector(window.innerWidth, window.innerHeight);
    }

    useEffect(() => {
        const onResize = () => setSize(getSize());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    });

    return size;
}