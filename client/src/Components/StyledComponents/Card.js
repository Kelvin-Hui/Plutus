import React from "react";

//Import Scss
import "./StyledComponents.scss";

//Import clsx
import clsx from "clsx";

export default function Card(props) {
    return (
        <div className={clsx({ Card: true, H100: props.H100 })}>
            {props.children}
        </div>
    );
}
