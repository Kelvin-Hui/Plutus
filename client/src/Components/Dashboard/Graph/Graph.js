import React from "react";

//Import Custom Util Components
import Card from "../../StyledComponents/Card";
import LineChart from "./LineChart";

export default function Graph({ transactions, portfolioValue }) {
    transactions =
        transactions !== undefined
            ? transactions.map((data) => ({
                  ...data,
                  date: new Date(data.date),
              }))
            : [];

    return (
        <div className="Graph">
            <Card H100={true}>
                <LineChart
                    transactions={transactions}
                    portfolioValue={portfolioValue}
                />
            </Card>
        </div>
    );
}
