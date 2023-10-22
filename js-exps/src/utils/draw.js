export function circle(ctx, center, radius, color) {
    ctx.fillStyle = color.str();
    ctx.beginPath();
    ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
    ctx.fill();
}

export function polygon(ctx, points, color) {
    ctx.fillStyle = color.str();
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    for (let i = 1; i < points.length; i++) ctx.lineTo(...points[i]);
    ctx.closePath();
    ctx.fill();
}