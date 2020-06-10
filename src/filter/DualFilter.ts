export interface DualFilter {
    filter(x: number, y:number, dt: number): [number, number];
};