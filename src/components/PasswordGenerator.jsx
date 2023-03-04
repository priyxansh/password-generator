import React, { useState, useEffect, useRef } from "react";
import "./css/PasswordGenerator.css";

export default function PasswordGenerator() {


    return (
        <section className="container">
            <h1>Password Generator</h1>
            <div className="display cell"></div>
            <LengthSlider />
            <Settings />
        </section>
    );
}

const LengthSlider = () => {
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
    }, []);

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

const Settings = () => {
    return (
        <div className="settings-wrapper">
            <div className="options-container">
                <div className="cell option">
                    <span>Include Uppercase</span>
                    <Switch defaultChecked={true} />
                </div>
                <div className="cell option">
                    <span>Include Lowercase</span>
                    <Switch defaultChecked={true} />
                </div>
                <div className="cell option">
                    <span>Include Numbers</span>
                    <Switch />
                </div>
                <div className="cell option">
                    <span>Include Symbols</span>
                    <Switch />
                </div>
            </div>
        </div>
    );
};

const Switch = (props) => {
    return (
        <label className="switch">
            <input type="checkbox" defaultChecked={props.defaultChecked} />
            <span className="switch-slider"></span>
        </label>
    );
};

Switch.defaultProps = {
    defaultChecked: false,
};
