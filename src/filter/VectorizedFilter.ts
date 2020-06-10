import { VectorFilter } from './VectorFilter';
import { VectorLike, Vector } from '../Vector';
import { Filter } from './Filter';

export class VectorizedFilter implements VectorFilter {

    xFilter: Filter;
    yFilter: Filter;

    constructor(cls: { new(...args: any[]): Filter}, ...args: any[]) {
        this.xFilter = new cls(...args);
        this.yFilter = new cls(...args);
    }

    filter(v: VectorLike, dt: number): Vector {
        const result : Vector = new Vector();
        result.x = this.xFilter.filter(v.x, dt);
        result.y = this.yFilter.filter(v.y, dt);
        return result;
    }

}