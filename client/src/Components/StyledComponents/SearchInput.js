import React from "react";

export default function SearchInput(props) {
    return (
        <>
            <div className="SearchInput">
                <input
                    className="Inputarea"
                    type="search"
                    placeholder={props.placeholder}
                    onKeyDown={(e) => {
                        e.key === "Enter" &&
                            props.setSymbol(e.target.value.toUpperCase());
                    }}
                />
            </div>
        </>
    );
}
