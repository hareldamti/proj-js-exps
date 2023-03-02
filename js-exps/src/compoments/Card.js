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
        let context = canvas.getContext('2d');
        let animationFrameId;
        const render = () => {
            experiment.draw(experiment.system, experiment.config, context);
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