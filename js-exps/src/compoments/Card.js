import { useEffect, useState, useRef } from "react";
import React from "react";
import './components.css';

const Card = ({experiment, config}) => {
    const [open, setOpen] = useState(false);
    const canvasRef = useRef();
    const animationRequest = useRef();
    experiment.config = {...experiment.config, ...config};

    

    useEffect(()=> {
        if (!open) return;
        let canvas = canvasRef.current;
        let p = (e) => { return [e.clientX - e.target.getBoundingClientRect().left, e.clientY - e.target.getBoundingClientRect().top]; }
        canvas.addEventListener('mousedown', e=>{
            experiment.env.input.mouse = {
                down: true,
                p: p(e),
                v: [0, 0]
            };
        });
        canvas.addEventListener('mousemove', e=>{
            let prev = experiment.env.input.mouse.p;
            experiment.env.input.mouse.p = p(e);
            experiment.env.input.mouse.v = [0, 1].map( i => experiment.env.input.mouse.p[i] - prev[i] );
            
            
        });
        canvas.addEventListener('mouseup', e=>{
            experiment.env.input.mouse.down = false;
        });
        let context = canvas.getContext('2d');
        let animationFrameId;
        experiment.init(experiment.system, experiment.config, context);
        const render = () => {
            experiment.update(experiment.env, experiment.system, experiment.config);
            experiment.draw( experiment.system, experiment.config, context);
            animationFrameId = window.requestAnimationFrame(render);
        }
        animationFrameId = window.requestAnimationFrame(render);
        return () => window.cancelAnimationFrame(animationFrameId);
    },[open]);

    return <div className="card" onClick={()=> !open && setOpen(!open)}>
        {!open && <div className="card-name"> {experiment.name} </div>}
        {open && <button className="card-button" onClick={()=>setOpen(!open)}>✖</button>}
        {open && <canvas ref={canvasRef} width={experiment.config.width} height={experiment.config.height}></canvas>}
    </div>
}

export default Card;