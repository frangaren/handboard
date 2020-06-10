import { Vector, VectorLike } from "../Vector";
import { DualVectorFilter } from "./DualVectorFilter";

export class VectorInversionFilter implements DualVectorFilter {

    private lastA?: Vector;
    private lastB?: Vector;
    private lastVA?: Vector;
    private lastVB?: Vector;

    filter(a: VectorLike, b: VectorLike, dt: number): [Vector, Vector] {
        const lastA = this.lastA ?? Vector.from(a);
        const lastB = this.lastB ?? Vector.from(b);
        const lastVA = this.lastVA ?? new Vector();
        const lastVB = this.lastVB ?? new Vector();
        const aPred = lastA.copy().add(Vector.prod(lastVA, dt));
        const bPred = lastB.copy().add(Vector.prod(lastVB, dt));
        const score = Vector.sub(a, aPred).div(lastVA).sqAbs()
                    + Vector.sub(b, bPred).div(lastVB).sqAbs();
        const invertScore = Vector.sub(b, aPred).div(lastVA).sqAbs()
                          + Vector.sub(a, bPred).div(lastVB).sqAbs();
        let result: [Vector, Vector] = [Vector.from(a), Vector.from(b)];
        if (invertScore < score) {
            result = [Vector.from(b), Vector.from(a)];
        }
        const va = Vector.sub(result[0], lastA).div(dt);
        const vb = Vector.sub(result[1], lastB).div(dt);
        this.lastA = result[0];
        this.lastVA = va;
        this.lastB = result[1];
        this.lastVB = vb;
        return result;
    }

};