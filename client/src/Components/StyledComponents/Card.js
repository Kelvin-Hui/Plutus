import React from "react";

//Import Scss
import "./StyledComponents.scss";

export default function Card(props) {
    return <div className="Card">{props.children}</div>;
}
