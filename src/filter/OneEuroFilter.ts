import { Filter } from './Filter';
import { LowPassFilter } from './LowPassFilter';

export class OneEuroFilter implements Filter {

    readonly mincutoff: number;
    readonly beta: number;
    private lastY?: number;
    private dxfilt: LowPassFilter;
    private xfilt: LowPassFilter;

    constructor(
        mincutoff: number = 1.0,
        beta: number = 0.0,
        dcutoff: number = 1.0
    ) {
        this.mincutoff = mincutoff;
        this.beta = beta;
        this.dxfilt = new LowPassFilter(dcutoff);
        this.xfilt = new LowPassFilter();
    }

    get dcutoff(): number | undefined {
        return this.dxfilt.cutoff;
    }

    get cutoff(): number | undefined {
        return this.xfilt.cutoff;
    }

    filter(x: number, dt: number): number {
        const dx = (x - (this.lastY ?? x)) / dt;
        const edx = this.dxfilt.filter(dx, dt);
        const cutoff = this.mincutoff + this.beta * Math.abs(edx);
        const y = this.xfilt.filter(x, dt, cutoff);
        this.lastY = y;
        return y;
    }

};