import React, { useState, useEffect, useRef } from "react";
import "./css/PasswordGenerator.css";

export default function PasswordGenerator() {
    return (
        <section className="container">
            <h1>Password Generator</h1>
            <div className="display cell"></div>
            <LengthSlider />
        </section>
    );
}

const LengthSlider = (props) => {
    const [length, setLength] = useState(10);
    const [maxLength, setMaxLength] = useState(24);

    const inputRef = useRef();

    const inputScrollHandler = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        inputRef.current.addEventListener("wheel", inputScrollHandler);

        return () => {
            inputRef.current.removeEventListener("wheel", inputScrollHandler);
        };
    },[]);

    return (
        <div className="length-wrapper">
            <span>Length: {length}</span>
            <div className="input-control range-input-control cell">
                <span>6</span>
                <input
                    ref={inputRef}
                    type="range"
                    name="length-slider"
                    id="length-slider"
                    min={6}
                    max={maxLength}
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
                <span>24</span>
            </div>
        </div>
    );
};
