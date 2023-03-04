import React, { useState, useEffect, useRef } from "react";
import "./css/PasswordGenerator.css";

export default function PasswordGenerator() {
    const [length, setLength] = useState(10);
    const [options, setOptions] = useState([
        { title: "Uppercase", checked: true, id: 0 },
        { title: "Lowercase", checked: true, id: 1 },
        { title: "Numbers", checked: false, id: 2 },
        { title: "Symbols", checked: false, id: 3 },
    ]);

    const sliderChangeHandler = (e) => {
        setLength(e.target.value);
    };

    const switchToggleHandler = (id) => {
        const tempOptions = [...options];
        const temp = tempOptions.find((option) => option.id === id);
        temp.checked = !temp.checked;
        setOptions(tempOptions);
        console.log(options);
    };

    return (
        <section className="container">
            <h1>Password Generator</h1>
            <div className="display cell"></div>
            <LengthSlider length={length} onChange={sliderChangeHandler} />
            <div className="settings-wrapper">
                <div className="options-container">
                    {options.map((option) => (
                        <Option
                            title={option.title}
                            checked={option.checked}
                            id={option.id}
                            onChange={switchToggleHandler}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

const LengthSlider = ({ length, onChange }) => {
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
                    onChange={(e) => onChange(e)}
                />
                <span>24</span>
            </div>
        </div>
    );
};

const Option = ({ title, checked, id, onChange }) => {
    return (
        <div className="cell option">
            <span>Include {title}</span>
            <label className="switch">
                <input
                    type="checkbox"
                    defaultChecked={checked}
                    onChange={() => {
                        onChange(id);
                    }}
                />
                <span className="switch-slider"></span>
            </label>
        </div>
    );
};
