import React from "react";

//Import Scss
import "./StyledComponents.scss";

export default function SearchInput(props) {
    function enter(e) {
        if (props.setExp !== undefined) {
            props.setExp(null);
        }
        props.setSymbol(e.target.value.toUpperCase());
    }
    return (
        <>
            <div className="SearchInput">
                <input
                    className="Inputarea"
                    type="search"
                    placeholder={props.placeholder}
                    onKeyDown={(e) => {
                        e.key === "Enter" && enter(e);
                    }}
                />
            </div>
        </>
    );
}
