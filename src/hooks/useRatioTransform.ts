import { Vector } from "../Vector";
import { useState, useEffect } from "react";
import { Transform } from "../Transform";
import { useRatio } from "./useRatio";

export function useRatioTransform() {
    const ratio = useRatio();
    const [transform, setTransform] = useState<Transform>(Transform.id());

    useEffect(() => {
        setTransform(
            Transform.fromBasis(
                new Vector(ratio.x, -ratio.y),
                new Vector(-ratio.x, ratio.y)
            )
        );
    }, [ratio]);

    return transform;
}