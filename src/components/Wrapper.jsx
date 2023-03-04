import React from "react";
import "./css/Wrapper.css";

export default function Wrapper(props) {
    return <main className="wrapper">{props.children}</main>;
}
