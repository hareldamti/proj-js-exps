import { useState } from "react";
import React from "react";
import './components.css';

const Card = (props) => {
    const [open, setOpen] = useState(false);
    props.experiment.config += props.config;
    if (!open) 
        return (
            <div className="closed-card" onClick={()=>setOpen(!open)}>
                <div className="card-name"> {props.experiment.name} </div>
            </div>
        );
    return (
            <div className="open-card">
                <button className="card-button" onClick={()=>setOpen(!open)}>close</button>
                < props.experiment.Compoment />
            </div>
    );
}

export default Card;