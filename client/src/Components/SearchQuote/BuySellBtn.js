import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";
//Import clsx
import clsx from "clsx";

export default function BuySellBtn({ price, percent }) {
    console.log(price);
    console.log(percent);
    return (
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
                            <button className="Btn Buy"> Buy</button>
                            <div className="Quantity">
                                <span>Quantity : </span>
                                <input />
                            </div>
                            <button className="Btn Sell"> Sell</button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
