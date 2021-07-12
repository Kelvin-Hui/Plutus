import React from "react";

//Import Scss
import "./StyledComponents.scss";
//Import Axios for API calling
import axios from "axios";
//Import clsx
import clsx from "clsx";

//NAV
//Import UserContext
import UserContext from "../../Context/UserContext";

export default function SearchInput(props) {
    const [error, setError] = React.useState(false);
    //NAV
    const { nav, setNav } = React.useContext(UserContext);

    async function check(symbol) {
        return axios
            .get(`http://localhost:5000/api/checkSymbol?symbol=${symbol}`)
            .then((res) => {
                return res.data.valid;
            });
    }
    function toggleSnackbar(status, msg) {
        var snack = document.getElementsByClassName("Snackbar")[0];

        snack.className = `Snackbar ${status} Show`;
        snack.textContent = msg;

        setTimeout(function () {
            snack.className = "Snackbar";
        }, 1900);
    }

    function enter(e) {
        let valid = check(e.target.value.toUpperCase());

        if (props.setNews !== undefined) {
            props.setNews([]);
        }

        valid.then(function (v) {
            if (v) {
                //props.setSymbol(e.target.value.toUpperCase());
                setNav({ ...nav, symbol: e.target.value.toUpperCase() });
            } else {
                toggleSnackbar("Error", "Error ! Symbol Not Found !");
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
                    // placeholder={props.placeholder}
                    placeholder={nav.symbol}
                    onKeyDown={(e) => {
                        e.key === "Enter" && enter(e);
                    }}
                />
                {/* <span
                    className={clsx({ Error_msg: error })}
                    style={{ display: error ? "block" : "none" }}
                >
                    Error ! Symbol Not Found !
                </span> */}
            </div>
        </>
    );
}
