import React from "react";

//Import Scss
import "./StyledComponents.scss";

export default function Spinner() {
    return (
        <div className="SpinnerContainer">
            <div className="Spinner" />
            {/* <h1>Loading...</h1> */}
            <h1>Launching Plutus...</h1>
        </div>
    );
}
