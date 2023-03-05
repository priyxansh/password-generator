import React, { useState, useEffect, useRef } from "react";
import "./css/PasswordGenerator.css";

export default function PasswordGenerator() {
    const [length, setLength] = useState(10);
    const [password, setPassword] = useState("");
    const [options, setOptions] = useState([
        {
            title: "Uppercase",
            checked: true,
            id: 0,
            template: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        },
        {
            title: "Lowercase",
            checked: true,
            id: 1,
            template: "abcdefghijklmnopqrstuvwxyz",
        },
        {
            title: "Numbers",
            checked: false,
            id: 2,
            template: "0123456789".repeat(2), // repeat(2) to increase number probability
        },
        {
            title: "Symbols",
            checked: false,
            id: 3,
            template: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
        },
    ]);

    const sliderChangeHandler = (e) => {
        setLength(e.target.value);
    };

    const switchToggleHandler = (id) => {
        const tempOptions = [...options];
        const temp = tempOptions.find((option) => option.id === id);
        temp.checked = !temp.checked;
        setOptions(tempOptions);
    };

    const passwordCopyHandler = () => {
        navigator.clipboard.writeText(password);
    };

    useEffect(() => {
        let template = "";
        let tempPassword = "";

        options.forEach((option) => {
            if (option.checked) {
                template += option.template;
            }
        });

        for (let i = 0; i < length; i++) {
            tempPassword +=
                template[Math.floor(Math.random() * template.length)];
        }

        setPassword(tempPassword);
    }, [length, options]);

    return (
        <section className="container">
            <h1>Password Generator</h1>
            <div className="display cell" onClick={passwordCopyHandler}>
                <span className="password">{password}</span>
            </div>
            <LengthSlider length={length} onChange={sliderChangeHandler} />
            <div className="settings-wrapper">
                <span>Settings</span>
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
    const inputRef = useRef(null);

    const inputScrollHandler = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        // let element = inputRef.current
        inputRef.current.addEventListener("wheel", inputScrollHandler);

        return () => {
            inputRef.current.removeEventListener("wheel", inputScrollHandler);
        };
    });

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
