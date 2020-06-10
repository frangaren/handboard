import { Filter } from "./Filter";

export class LowPassFilter implements Filter {

    readonly cutoff?: number;
    private lastY?: number;

    constructor(cutoff?: number) {
        this.cutoff = cutoff;
    }

    private alpha(dt: number, cutoff?: number): number {
        if (cutoff === undefined) {
            return 1.0;
        } else {
            const tau = 1.0 / (2 * Math.PI * cutoff);
            return 1.0 / (1.0 + tau/dt);
        }
    }

    filter(x: number, dt: number, cutoff?: number): number {
        const alpha = this.alpha(dt, cutoff ?? this.cutoff);
        const y = alpha * x + (1 - alpha) * (this.lastY ?? x);
        this.lastY = y;
        return y;
    }

};