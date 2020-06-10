export interface VectorLike {
    x: number,
    y: number,
};

export class Vector implements VectorLike {

    x: number;
    y: number;



    constructor(x?: number, y?: number) {
        this.x = x ?? 0;
        this.y = y ?? this.x;
    }

    static from(other: VectorLike | number) {
        if (typeof other === 'number') {
            return new Vector(other);
        } else {
            return new Vector(other.x, other.y);
        }
    }

    copy() {
        return Vector.from(this);
    }



    neg() : Vector {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    add(other: VectorLike | number) : Vector {
        if (typeof other === 'number') {
            this.x += other;
            this.y += other;
        } else {
            this.x += other.x;
            this.y += other.y;
        }
        return this;
    }

    sub(other: VectorLike | number ) : Vector {
        if (typeof other === 'number') {
            this.x -= other;
            this.y -= other;
        } else {
            this.x -= other.x;
            this.y -= other.y;
        }
        return this;
    }

    inv(): Vector {
        this.x = 1.0 / this.x;
        this.y = 1.0 / this.y;
        return this;
    }

    prod(other: VectorLike | number) : Vector {
        if (typeof other === 'number') {
            this.x *= other;
            this.y *= other;
        } else {
            this.x *= other.x;
            this.y *= other.y;
        }
        return this;
    }

    div(other: VectorLike | number): Vector {
        if (typeof other === 'number') {
            this.x /= other;
            this.y /= other;
        } else {
            this.x /= other.x;
            this.y /= other.y;
        }
        return this;
    }

    dot(other: VectorLike): number {
        return this.x * other.x + this.y * other.y;
    }

    sqAbs(): number {
        return this.dot(this);
    }

    abs(): number {
        return Math.sqrt(this.dot(this));
    }

    pos(): Vector {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }

    swap(): Vector {
        const temp = this.x;
        this.y = this.x;
        this.x = temp;
        return this;
    }



    static neg(a: VectorLike): Vector {
        return Vector.from(a).neg();
    }

    static add(a: VectorLike | number, b: VectorLike | number): Vector {
        return Vector.from(a).add(Vector.from(b));
    }

    static sub(a: VectorLike | number, b: VectorLike | number): Vector {
        return Vector.from(a).sub(Vector.from(b));
    }

    static inv(a: VectorLike | number): Vector {
        return Vector.from(a).inv();
    }

    static prod(a: VectorLike | number, b: VectorLike | number): Vector {
        return Vector.from(a).prod(Vector.from(b));
    }

    static div(a: VectorLike | number, b: VectorLike | number): Vector {
        return Vector.from(a).div(Vector.from(b));
    }

    static dot(a: VectorLike | number, b: VectorLike | number): number {
        return Vector.from(a).dot(Vector.from(b));
    }

    static sqAbs(a: VectorLike | number): number {
        return Vector.from(a).sqAbs();
    }

    static abs(a: VectorLike | number): number {
        return Vector.from(a).abs();
    }

    static pos(a: VectorLike): Vector{
        return Vector.from(a).pos();
    }

    static swap(a: VectorLike): Vector {
        return Vector.from(a).swap();
    }



    sqDistanceTo(other: VectorLike): number {
        const v = Vector.sub(this, other);
        return v.dot(v);
    }

    distanceTo(other: VectorLike): number {
        return Math.sqrt(this.sqDistanceTo(other));
    }

    static sqDistance(a: VectorLike, b: VectorLike): number {
        const v = Vector.sub(a, b);
        return v.dot(v);
    }

    static distance(a: VectorLike, b: VectorLike): number {
        return Math.sqrt(Vector.sqDistance(a, b));
    }
}