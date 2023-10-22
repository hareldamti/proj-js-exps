import { Vec3, Canvas } from "../utils/vec3";
import { RGBA } from "../utils/rgba";
import { circle, polygon } from "../utils/draw";

var defaultConfig = {
    width: 800,
    height: 400,
    n: 50,
    dt: 0.01,
}
var defaultEnv = {
    input: {
        mouse: {
            down: false,
            p: new Vec3(0,0,0),
            v: new Vec3(0,0,0)
        }
    }
}

var Shapes = {
    name: "Shapes",
    config: defaultConfig,
    env: defaultEnv,
    system: {
        canvas: new Canvas(defaultConfig.width, defaultConfig.height, 1.5),
        t: 0,
        curve: x => 0,
        shapes: new Array(0)
    },
    init: (system, config, ctx) => {
        for (let i of Array(config.n).keys()) {
            let shape = {
                circle: (Math.random() > .33)
            }
            if (!shape.circle) shape.points = [
                Vec3.spherical(Math.random(),  Math.PI / 2 , Math.random() * Math.PI * 2 / 3),
                Vec3.spherical(Math.random(), Math.PI / 2, (1 + Math.random()) * Math.PI * 2 / 3),
                Vec3.spherical(Math.random(), Math.PI / 2, (2 + Math.random()) * Math.PI * 2 / 3),
            ];
            else { shape.r = Math.random() * .4; shape.p = Vec3.random2(1); shape.p.x *= config.width / config.height; };
            
            let t = Math.random();
            shape.color = RGBA.mix(
                new RGBA(0,0,255,1),
                new RGBA(255,0,0,1),
                t
            );
            system.shapes.push(shape);
        }
        console.log(system.shapes);
    },
    update: (env, system, config) => {
        system.t += config.dt;
    },
    draw: (system, config, ctx) => {
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, config.width, config.height);
        for (let shape of system.shapes) {
            shape.circle ?
            circle(ctx, system.canvas.toCanvas(shape.p.proj2d(1.5)), system.canvas.toCanvas(shape.r), shape.color) :
            polygon(ctx, shape.points.map(vec => system.canvas.toCanvas(vec.proj2d(1.5))), shape.color);
        }
    }
};
export default Shapes;