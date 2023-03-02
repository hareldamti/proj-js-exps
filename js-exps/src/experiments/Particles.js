import { useEffect, useState } from "react";

var defaultConfig = {
    width: 800,
    height: 400
}

var Particles = {
    name: "Particles",
    config: defaultConfig,
    system: {
        t: 0
    },
    init: (system, config) => {},
    update: (system, config) => {},
    draw: (system, config, ctx) => {
        system.t+=1;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, config.width, config.height);
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(system.t, 200, 20, 0, 2 * Math.PI);
        ctx.fill();
    }
}
export default Particles;