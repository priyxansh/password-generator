import React, { useState } from "react";
import "./css/PasswordGenerator.css";

export default function PasswordGenerator() {
    const [length, setLength] = useState(16);

    return (
        <section className="container">
            <h1>Password Generator</h1>
            <div className="display cell"></div>
            <LengthSlider length={length} />
        </section>
    );
}

const LengthSlider = (props) => (
    <div className="input-control range-input-control cell">
        <input type="range" name="length-slider" id="length-slider" />
    </div>
);
