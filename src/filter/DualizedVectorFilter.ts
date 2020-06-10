import { DualVectorFilter } from "./DualVectorFilter";
import { VectorFilter } from "./VectorFilter";
import { VectorLike, Vector } from "../Vector";

export class DualizedVectorFilter implements DualVectorFilter {

    aFilter: VectorFilter;
    bFilter: VectorFilter;

    constructor(cls: { new(...args: any[]): VectorFilter }, ...args: any[]) {
        this.aFilter = new cls(...args);
        this.bFilter = new cls(...args);
    }

    filter(a: VectorLike, b: VectorLike, dt: number): [Vector, Vector] {
        const resultA = this.aFilter.filter(a, dt);
        const resultB = this.bFilter.filter(b, dt);
        return [resultA, resultB];
    }
}