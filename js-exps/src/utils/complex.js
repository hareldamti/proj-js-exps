import { Vec3 } from "./vec3";

export class Comp {
  constructor(real, imag) {
    if (real instanceof Vec3) {
        this.real = real.x;
        this.imag = real.y;
        return;
    }
    this.real = real;
    this.imag = imag;
  }
  static random(size) {
    return new Comp(
      (Math.random() * 2 - 1) * size,
      (Math.random() * 2 - 1) * size
    );
  }
  static spherical(r, theta) {
    return new Comp(Math.cos(theta), Math.sin(theta)).mul(r);
  }
  add(other) {
    return new Comp(this.real + other.real, this.imag + other.imag);
  }
  mul(other) {
    if (other instanceof Comp)
      return new Comp(
        this.real * other.real - this.imag * other.imag,
        this.real * other.imag + this.imag * other.real
      );
    return new Comp(this.real * other, this.imag * other);
  }
  sub(other) {
    return this.add(other.mul(-1));
  }
  pow(other) {
      return new Comp(Math.log(this.len), this.theta).mul(other).exp();
  }
  exp() {
    return new Comp(Math.cos(this.imag), Math.sin(this.imag)).mul(Math.exp(this.real));
  }
  get len() {
    return Math.sqrt(this.real * this.real + this.imag * this.imag);
  }
  get theta() {
    return Math.atan2(this.imag, this.real);
  }
  get norm() {
    return this.div(this.len);
  }
  get asVec3() { return new Vec3(this.real, this.imag, 0); }
}

export class Canvas {
  constructor(width, height, box_size) {
    this.width = width;
    this.height = height;
    this.box_size = box_size;
    this.min_size = Math.min(width, height);
  }
  toCanvas(vec) {
    if (vec instanceof Vec3)
      return [
        this.width / 2 + (vec.x * this.min_size) / (2 * this.box_size),
        this.height / 2 + (vec.y * this.min_size) / (2 * this.box_size),
      ];
    return (vec * this.min_size) / (2 * this.box_size);
  }
  fromCanvas(point) {
    if (point instanceof Array)
      return new Vec3(
        ((point[0] - this.width / 2) * (2 * this.box_size)) / this.min_size,
        ((point[1] - this.height / 2) * (2 * this.box_size)) / this.min_size,
        0
      );
    return (point / this.min_size) * (2 * this.box_size);
  }
}
