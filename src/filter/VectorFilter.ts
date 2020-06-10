import { Vector, VectorLike } from "../Vector";
import { Filter } from "./Filter";

export interface VectorFilter {
    filter(v: VectorLike, dt: number): Vector;
};