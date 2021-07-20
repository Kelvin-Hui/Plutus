import React from "react";

//Import scss
import "./SearchQuote2.scss";

//Import Custom Util Components
import Card from "../StyledComponents/Card";
import Divider from "../StyledComponents/Divider";

//Import UserContext
import UserContext from "../../Context/UserContext";

export default function TransactionHistory() {
    const { userInfo, nav } = React.useContext(UserContext);

    const filteredTransactions = userInfo.transaction.filter(
        (data) => data.symbol == nav.symbol
    );

    return (
        <div className="TransactionHistory">
            <Card>
                <table>
                    <tr className="Colname">
                        <th key="Colname_Date">Date</th>
                        <th key="Colname_Price">Price</th>
                        <th key="Colname_Total">Total</th>
                    </tr>
                    <tbody>
                        {filteredTransactions.map((d, idx) => {
                            const Buy = d.quantity > 0;
                            return (
                                <>
                                    <tr
                                        className="Row"
                                        key={"transaction_" + idx}
                                    >
                                        <td
                                            className="Type"
                                            style={{
                                                color: Buy ? "green" : "red",
                                            }}
                                            date={new Date(
                                                d.date
                                            ).toLocaleDateString()}
                                            key={"transaction_type_" + idx}
                                        >
                                            {Buy ? "Buy" : "Sell"}
                                        </td>

                                        <td
                                            className="Quantity"
                                            price={d.price}
                                            key={"transaction_quantity_" + idx}
                                        >
                                            {d.quantity}
                                        </td>

                                        <td
                                            className="Total"
                                            style={{
                                                color: Buy ? "red" : "green",
                                            }}
                                            key={"transaction_total_" + idx}
                                        >
                                            $
                                            {Number(
                                                (
                                                    d.price *
                                                    d.quantity *
                                                    -1
                                                ).toFixed(2)
                                            ).toLocaleString("en")}
                                        </td>
                                    </tr>
                                </>
                            );
                        })}
                        {filteredTransactions.length === 0 && (
                            <>
                                <td>No</td>
                                <td>Transaction</td>
                                <td>History</td>
                            </>
                        )}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
