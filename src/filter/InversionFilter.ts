import { VectorLike, Vector } from "../Vector";
import { DualFilter } from "./DualFilter";

export class InversionFilter implements DualFilter {

    private lastY?: Vector;
    private lastV?: Vector;

    filter(a: number, b: number, dt: number): [number, number] {
        const lastY = this.lastY ?? new Vector();
        const lastV = this.lastV ?? new Vector();
        const x = new Vector(a, b);
        const pred = lastY.copy().add(Vector.prod(lastV, dt));
        let y = x;
        if (pred.sqDistanceTo(x) > pred.sqDistanceTo(Vector.swap(x))) {
           y = Vector.swap(x);
        }
        const v = Vector.sub(y, lastY).div(dt);
        this.lastY = y;
        this.lastV = v;
        return [y.x, y.y];
    }

};