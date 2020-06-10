import { Vector, VectorLike } from "../Vector";
import { Filter } from "./Filter";

export interface DualVectorFilter {
    filter(a: VectorLike, b: VectorLike, dt: number): [Vector, Vector];
};