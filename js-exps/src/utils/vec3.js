export class Vec3 {
    constructor(x,y,z){
        this.x=x;
        this.y=y;
        this.z=z;
    }
    static random(size){
        return new Vec3(
            (Math.random()*2-1)*size, (Math.random()*2-1)*size, (Math.random()*2-1)*size
        );
    }
    static random2(size) {
        return new Vec3(
            (Math.random()*2-1)*size, (Math.random()*2-1)*size, 0
        );
    }
    static spherical(r, phi, theta) {
        return new Vec3(
            Math.sin(phi) * Math.cos(theta),
            Math.sin(phi) * Math.sin(theta),
            Math.cos(phi)
            ).mul(r);
    }
    add(other){
        return new Vec3(this.x+other.x,this.y+other.y,this.z+other.z)
    }
    mul(alpha){
        return new Vec3(this.x*alpha,this.y*alpha,this.z*alpha)
    }
    sub(other){
        return this.add(other.mul(-1))
    }
    div(alpha){
        return this.mul(1.0/alpha)
    }
    dot(other){
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    proj(other) {
        return other.norm.mul(this.dot(other)/other.len);
    }
    proj2d(zIndex) {
        return new Vec3(this.x * zIndex / (zIndex+this.z), this.y * zIndex / (zIndex+this.z), 0);
    }
    get len(){
        return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)
    }
    get norm(){
        return this.div(this.len)
    }
    
}


export class Canvas {
    constructor (width, height, box_size) {
        this.width = width;
        this.height = height;
        this.box_size = box_size;
        this.min_size = Math.min(width, height);
    }
    toCanvas(vec) {
        if (vec instanceof Vec3) 
            return [
                this.width / 2 + (vec.x * this.min_size / (2 * this.box_size)),
                this.height / 2 + (vec.y * this.min_size / (2 * this.box_size))
            ];
        return vec * this.min_size / (2 * this.box_size);
    }
    fromCanvas(point) {
        if (point instanceof Array) 
            return new Vec3(
                (point[0] - this.width / 2) * (2 * this.box_size) / this.min_size,
                (point[1] - this.height / 2) * (2 * this.box_size) / this.min_size,
                0
            );
        return point / this.min_size * (2 * this.box_size);
    }
}