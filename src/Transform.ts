import { VectorLike, Vector } from "./Vector";

export class Transform {

    private matrix: number[][];

    constructor() {
        this.matrix = new Array(3);
        for (let i = 0; i < 3; i++) {
            this.matrix[i] = new Array(3);
            for (let j = 0; j < 3; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    copy(): Transform {
        const transform = new Transform();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                transform.matrix[i][j] = this.matrix[i][j];
            }
        }
        return transform;
    }

    inv(): Transform {
        const transform = new Transform();
        const det = this.matrix[0][0] * this.matrix[1][1]
            - this.matrix[0][1] * this.matrix[1][0];
        transform.matrix[0][0] = this.matrix[1][1];
        transform.matrix[1][0] = -this.matrix[1][0];
        transform.matrix[0][1] = -this.matrix[0][1];
        transform.matrix[1][1] = this.matrix[0][0];
        transform.matrix[0][2] = this.matrix[1][2] * this.matrix[0][1]
                               - this.matrix[1][1] * this.matrix[0][2];
        transform.matrix[1][2] = this.matrix[1][0] * this.matrix[0][2]
                               - this.matrix[1][2] * this.matrix[0][0];
        transform.matrix[2][2] = 1;
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                transform.matrix[i][j] /= det;
            }
        }
        return transform;
    }

    append(other: Transform): Transform {
        const transform = this.copy();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.matrix[i][j] = 0;
                for (let k = 0; k < 3; k++) {
                    this.matrix[i][j] += other.matrix[i][k]
                                       * transform.matrix[k][j];
                }
            }
        }
        return this;
    }

    prepend(other: Transform): Transform {
        const transform = this.copy();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.matrix[i][j] = 0;
                for (let k = 0; k < 3; k++) {
                    this.matrix[i][j] += transform.matrix[i][k]
                                       * other.matrix[k][j];
                }
            }
        }
        return this;
    }

    translate(translation: Vector): Transform {
        return this.append(Transform.translate(translation));
    }

    scale(scale: number): Transform {
        return this.append(Transform.scale(scale));
    }

    rotate(degree: number): Transform {
        return this.append(Transform.rotate(degree));
    }

    fromPoints(
        oldP: VectorLike,
        oldQ: VectorLike,
        newP: VectorLike,
        newQ: VectorLike
    ): Transform {
        return this.append(Transform.fromPoints(oldP, oldQ, newP, newQ));
    }

    toString(): string {
        const m = this.matrix;
        return `matrix(${m[0][0]} ${m[1][0]} ${m[0][1]} ` +
            `${m[1][1]} ${m[0][2]} ${m[1][2]})`;
    }

    transform(p: VectorLike): Vector {
        return new Vector(
            p.x * this.matrix[0][0] + p.y * this.matrix[0][1] + this.matrix[0][2],
            p.x * this.matrix[1][0] + p.y * this.matrix[1][1] + this.matrix[1][2]
        );
    }

    static id(): Transform {
        const transform = new Transform();
        transform.matrix[0][0] = 1.0;
        transform.matrix[1][1] = 1.0;
        transform.matrix[2][2] = 1.0;
        return transform;
    }

    static translate(translation: Vector): Transform {
        const transform = Transform.id();
        transform.matrix[0][2] = translation.x;
        transform.matrix[1][2] = translation.y;
        return transform;
    }

    static scale(scale: number): Transform {
        const transform = Transform.id();
        transform.matrix[0][0] = scale;
        transform.matrix[1][1] = scale;
        return transform;
    }

    static rotate(degree: number): Transform {
        const transform = Transform.id();
        transform.matrix[0][0] = Math.cos(degree);
        transform.matrix[0][1] = Math.sin(degree);
        transform.matrix[1][0] = -Math.sin(degree);
        transform.matrix[1][1] = Math.cos(degree);
        return transform;
    }

    static fromPoints(
        p0: VectorLike,
        q0: VectorLike,
        p1: VectorLike,
        q1: VectorLike
    ): Transform {
        const v0 = Vector.sub(q0, p0);
        const v1 = Vector.sub(q1, p1);
        const c0 = Vector.add(p0, q0).div(2);
        const c1 = Vector.add(p1, q1).div(2);
        const d0 = v0.abs();
        const d1 = v1.abs();
        const alpha = Math.atan2(
            v1.x * v0.y - v0.x * v1.y,
            Vector.dot(v1, v0)
        );
        return Transform
            .rotate(alpha)
            .scale(d1 / d0)
            .translate(Vector.sub(c1, c0));
    }

    static fromBasis(
        a: VectorLike, // (1, 0)
        b: VectorLike // (0, 1)
    ): Transform {
        const transform = new Transform();
        transform.matrix[0][0] = a.x - b.x;
        transform.matrix[0][2] = b.x;
        transform.matrix[1][1] = b.y - a.y;
        transform.matrix[1][2] = a.y;
        transform.matrix[2][2] = 1;
        return transform;
    }

    static sequence(...args: Transform[]): Transform {
        const transform = Transform.id();
        for (let i = 0; i < args.length; i++) {
            transform.append(args[i]);
        }
        return transform;
    }

}