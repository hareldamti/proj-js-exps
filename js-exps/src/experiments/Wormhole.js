import { Vec3, Canvas } from "../utils/vec3";
import { RGBA } from "../utils/rgba";
import { circle, polygon } from "../utils/draw";

var defaultConfig = {
    width: 800,
    height: 400,
    n: 4000,
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

var Wormhole = {
    name: "Wormhole",
    config: defaultConfig,
    env: defaultEnv,
    system: {
        canvas: new Canvas(defaultConfig.width, defaultConfig.height, 1.5),
        t: 0,
        curve: x => 0,
        points: new Array(0)
    },
    init: (system, config, ctx) => {
        for (let k = 0; k < 20; k++) {
            let line = new Array(0),
                z = k;
            for (let a = 0; a < 21; a++) {
                let theta = a * Math.PI * 2 / 20;
                line.push(new Vec3(Math.cos(theta), Math.sin(theta), z));
            }
            system.points.push(line);
        }
    },
    update: (env, system, config) => {
        system.t += config.dt;
        for (let k = 0; k < 20; k++) {
            let line = new Array(0),
                z = k - system.t ;
            for (let a = 0; a < 21; a++) {
                let theta = a * Math.PI * 2 / 20 + z * 2;
                line.push(new Vec3(Math.cos(theta), Math.sin(theta), z));
            }
            system.points[k] = (line);
        }
    },
    draw: (system, config, ctx) => {
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, config.width, config.height);

        for (let k = 0; k < 19; k++) {
            for (let a = 0; a < 20; a++) {
                let idx = [[k, a], [k, a+1], [k+1, a+1], [k+1, a]],
                poly = idx.map(([i,j]) => system.canvas.toCanvas(system.points[i][j].proj2d(1.5)));
                polygon(ctx, poly, ((a + k) % 2 == 0) ? new RGBA(0, 150, 100 + system.points[k][a].z * 10, 1) : new RGBA(255, 100, 200, 1));
            }
        }
    }
};
export default Wormhole;