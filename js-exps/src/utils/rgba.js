export class RGBA {
    constructor(r,g,b,a){
        this.r=r;
        this.g=g;
        this.b=b;
        this.a=a;
    }
    str() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
    static colormap(c_arr, k) {
        let i = 0;
        while (i < c_arr.length - 1 && i + 1 < k * c_arr.length) {
            i++;
        }
        if (i == c_arr.length - 1) return c_arr[i];
        return RGBA.mix(c_arr[i], c_arr[i + 1], k * c_arr.length - i);

    }
    static mix(c1, c2, h) {
        return new RGBA(
            c2.r * h + c1.r * (1 - h),
            c2.g * h + c1.g * (1 - h),
            c2.b * h + c1.b * (1 - h),
            c2.a * h + c1.a * (1 - h)
            );
    }
}