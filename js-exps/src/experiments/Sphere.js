import { useEffect, useState } from "react";
import { Vec3, Canvas } from "../utils/vec3";
import {circle } from "../utils/draw";
import { RGBA } from "../utils/rgba";
var defaultConfig = {
    width: 800,
    height: 400,
    n: 4000
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

var proj2d = (vec, z_index) => new Vec3(vec.x * z_index / (z_index+vec.z), vec.y * z_index / (z_index+vec.z), 0);

var Sphere = {
    name: "Sphere Sampling",
    config: defaultConfig,
    env: defaultEnv,
    system: {
        t: 0,
        p: new Array(0),
        c: new Canvas(defaultConfig.width, defaultConfig.height, 1.5),
        rot: [0, 0],
        rot_v: [0, 0],
        translate: (p, rot) => [p[0]+rot[0], p[1]+rot[1]],
    },
    init: (system, config, ctx) => {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, config.width, config.height);
        system.p = [...system.p,[0,0],[Math.PI, 0], [Math.PI/2, 0],[Math.PI/2, Math.PI/2],[Math.PI/2, Math.PI],[Math.PI/2, -Math.PI/2]];
    },
    update: (env, system, config) => {
        system.t+=1;
        if (env.input.mouse.down) {
            let p_ = system.c.fromCanvas(env.input.mouse.p).mul(0.01);
            system.rot_v = [system.rot_v[0] + p_.x, system.rot_v[1] + p_.y]
        }
        system.rot_v = [0, 0.3];
        system.rot = [system.rot[0] + system.rot_v[0] *0.01, system.rot[1] + system.rot_v[1] *0.01];
        //system.rot_v = [system.rot_v[0] * .994, system.rot_v[1]*.994 + .006];
        
        let a = Math.acos(Math.random() * 2 - 1), b = Math.random()*Math.PI*2;
        if (system.p.length < config.n) {
            system.p.push([a,b]);
        }

        let compZ = (p1, p2) => - Math.sin(p1[0])*Math.cos(p1[1]) + Math.sin(p2[0])*Math.cos(p2[1]);
        system.p.sort((p1, p2) => compZ(system.translate(p1, system.rot), system.translate(p2, system.rot)));
    
    },
    draw: (system, config, ctx) => {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(0, 0, config.width, config.height);
        let coord = (p) => 
        system.c.toCanvas(proj2d(Vec3.spherical(1,p[0],p[1]),1.5));
    
        for (let i = 0; i < system.p.length; i++) {
            let p = system.p[i];
            //p[0]-=0.004;
            //if (p[0] < 0) p[0]+=Math.PI;
            let p_ = coord(system.translate(p, system.rot));

            var rgb = Vec3.spherical(255, p[0]%(Math.PI/2), p[1]%(Math.PI/2));
            circle(ctx, p_,1, new RGBA(rgb.x, rgb.y, rgb.z, 1));
            
        }
        
        
    }
}
export default Sphere;