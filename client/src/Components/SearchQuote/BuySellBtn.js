import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";
import Snackbar from "../StyledComponents/Snackbar";

//Import clsx
import clsx from "clsx";

//Import UserContext;
import UserContext from "../../Context/UserContext";

//Import Axios for API calling
import axios from "axios";

export default function BuySellBtn({ symbol, price, percent }) {
    const { userInfo } = React.useContext(UserContext);
    const quantityRef = React.useRef();

    const url = "http://localhost:5000/api/order/";

    function toggleSnackbar(status, msg) {
        var snack = document.getElementsByClassName("Snackbar")[0];

        snack.className = `Snackbar ${status} Show`;
        snack.textContent = msg;

        setTimeout(function () {
            snack.className = "Snackbar";
        }, 1900);
    }

    function buy(e) {
        e.preventDefault();
        const sendOrder = async () => {
            const res = await axios.post(url + "buy", {
                userID: userInfo.userID,
                symbol: symbol,
                quantity: Math.round(quantityRef.current.value),
            });
            if (res.data.status == "fail") {
                toggleSnackbar("Error", res.data.message);
            } else {
                toggleSnackbar("Success", res.data.message);
            }
        };

        sendOrder();
    }

    function sell(e) {
        e.preventDefault();
        const sendOrder = async () => {
            const res = await axios.post(url + "sell", {
                userID: userInfo.userID,
                symbol: symbol,
                quantity: -1 * Math.round(quantityRef.current.value),
            });
            if (res.data.status == "fail") {
                toggleSnackbar("Error", res.data.message);
            } else {
                toggleSnackbar("Success", res.data.message);
            }
        };
        sendOrder();
    }
    return (
        <>
            {/* <Snackbar /> */}
            <div className="BuySellBtn">
                <Card H100={true}>
                    {price === undefined && percent === undefined ? (
                        <div
                            className="Skeleton"
                            style={{ height: "100%", width: "100%" }}
                        />
                    ) : (
                        <div className="BuySell">
                            <div className="Price">
                                <h1
                                    className={clsx({
                                        Up: percent.raw > 0,
                                        Down: percent.raw < 0,
                                    })}
                                >
                                    ${price}
                                </h1>
                                <h3
                                    className={clsx({
                                        Up: percent.raw > 0,
                                        Down: percent.raw < 0,
                                    })}
                                >
                                    {percent.raw > 0 ? "+" : null}
                                    {percent.fmt}
                                </h3>
                            </div>
                            <div></div>
                            <div className="Buttons">
                                <button
                                    className="Btn Buy"
                                    onClick={(e) => buy(e)}
                                >
                                    Market Buy
                                </button>
                                <div className="Quantity">
                                    <span>Quantity : </span>
                                    <input
                                        type="number"
                                        min={1}
                                        defaultValue={1}
                                        ref={quantityRef}
                                    />
                                </div>

                                <button
                                    className="Btn Sell"
                                    onClick={(e) => sell(e)}
                                >
                                    Market Sell
                                </button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </>
    );
}
