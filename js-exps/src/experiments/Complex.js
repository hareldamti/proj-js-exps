import { Vec3, Canvas } from "../utils/vec3";
import { RGBA } from "../utils/rgba";
import { circle, polygon } from "../utils/draw";
import { Comp } from "../utils/complex";

var defaultConfig = {
    width: 700,
    height: 400,
    n: 40,
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

var Complex = {
    name: "Complex",
    config: defaultConfig,
    env: defaultEnv,
    system: {
        canvas: new Canvas(defaultConfig.width, defaultConfig.height, 1.2),
        t: 0,
        curve: x => 0,
        shapes: new Array(0),
        exp: new Comp(0, Math.PI).exp()
    },
    init: (system, config, ctx) => {
        system.t = 0;
        for (let i of Array(config.n).keys()) {
            for (let j of Array(config.n).keys()) {
                let shape = {
                    circle: true,
                    p: new Vec3(
                        Math.tan(((i + .5) / config.n * 2 - 1) * Math.PI/2),
                        Math.tan(((j + .5) / config.n * 2 - 1) * Math.PI/2)
                        , 0),
                    radius: .01,
                    color: RGBA.colormap([
                        new RGBA(255, 0, 0, 1),
                        new RGBA(255, 200, 0, 1),
                        new RGBA(0, 255, 0, 1),
                        new RGBA(0, 200, 255, 1),
                        
                    ],
                        (i + config.n * j) / Math.pow(config.n, 2)
                    )
                };
                system.shapes.push(shape);
            }
        }
    },
    update: (env, system, config) => {
        system.t += config.dt;
        if (env.input.mouse.down) {
            system.exp = new Comp(system.canvas.fromCanvas(env.input.mouse.p));
            console.log(env.input.mouse.p, system.canvas.fromCanvas(env.input.mouse.p));
        }
        for (let shape of system.shapes) {
            shape.p.x += (Math.pow(shape.p.x,2) + 1) * config.dt;
            if (shape.p.x > 10) {
                shape.p.x -= 20;
            }
        }
    },
    draw: (system, config, ctx) => {
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, config.width, config.height);
        for (let shape of system.shapes) {
            let p = new Comp(shape.p).pow(system.exp).asVec3;
            circle(
                ctx,
                system.canvas.toCanvas(p.proj2d(1.5)),
                system.canvas.toCanvas(shape.radius),
                shape.color
            );
        }
    }
};
export default Complex;