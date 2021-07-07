import React from "react";

//Import Scss
import "./StyledComponents.scss";
//Import Axios for API calling
import axios from "axios";
//Import clsx
import clsx from "clsx";

export default function SearchInput(props) {
    const [error, setError] = React.useState(false);

    async function check(symbol) {
        return axios
            .get(`http://localhost:5000/api/checkSymbol?symbol=${symbol}`)
            .then((res) => {
                return res.data.valid;
            });
    }

    function enter(e) {
        let valid = check(e.target.value.toUpperCase());

        if (props.setNews !== undefined) {
            props.setNews([]);
        }

        valid.then(function (v) {
            if (v) {
                props.setSymbol(e.target.value.toUpperCase());
            }
            setError(!v);
        });
    }
    return (
        <>
            <div className="SearchInput">
                <input
                    className={clsx({ Inputarea: true, Error: error })}
                    type="search"
                    placeholder={props.placeholder}
                    onKeyDown={(e) => {
                        e.key === "Enter" && enter(e);
                    }}
                />
                <span
                    className={clsx({ Error_msg: error })}
                    style={{ display: error ? "block" : "none" }}
                >
                    Error ! Symbol Not Found !
                </span>
            </div>
        </>
    );
}
