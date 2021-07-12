import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";
//Import clsx
import clsx from "clsx";

export default function Transactions({ transactions }) {
    transactions =
        transactions !== undefined
            ? transactions.sort(
                  (a, b) => Date.parse(b.date) - Date.parse(a.date)
              )
            : [];
    const columns = [
        "Date",
        "Symbol",
        "Transaction Type",
        "Quantity",
        "Average Price Per Share ($)",
        "Profit & Loss",
    ];
    return (
        <div className="Transactions">
            <Card>
                <table className="TransactionsTable">
                    <thead>
                        <tr>
                            <th colSpan={6}>Transactions History</th>
                        </tr>
                        <tr className="ColName">
                            {columns.map((col, idx) => {
                                return <th key={col + idx}>{col}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length !== 0 &&
                            transactions.map((data, idx) => {
                                return (
                                    <tr key={"transactions_" + idx}>
                                        <td>
                                            {new Date(
                                                data.date
                                            ).toLocaleString()}
                                        </td>
                                        <td>
                                            <b>{data.symbol}</b>
                                        </td>
                                        <td
                                            className={clsx({
                                                TransactionType: true,
                                                buy: data.quantity > 0,
                                                sell: data.quantity < 0,
                                            })}
                                        >
                                            {data.quantity > 0 ? "Buy" : "Sell"}
                                        </td>
                                        <td>{Math.abs(data.quantity)}</td>
                                        <td>${data.price}</td>
                                        <td>
                                            {data.pnl === 0
                                                ? " - "
                                                : "$" + data.pnl.toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
