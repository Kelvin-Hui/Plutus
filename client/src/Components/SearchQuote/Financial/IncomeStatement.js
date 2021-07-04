import React from "react";

//Import Custom Util Components
import Card from "../../StyledComponents/Card";

//Import BarChart
import BarChart from "./BarChart";

export default function IncomeStatement({ incomeRevenueYearly }) {
    // const ref = React.useRef();
    // const [data, setData] = React.useState([]);

    // React.useEffect(() => {
    //     getIncomeStatmentData();
    // }, [symbol]);

    // function processData(data) {
    //     return data.map((d, idx) => ({
    //         date: d.endDate,
    //         netIncome: d.netIncome,
    //         totalRevenue: d.totalRevenue,
    //     }));
    // }
    // function getIncomeStatmentData() {
    //     const datetime = new Date();
    //     const modules = `?modules=incomeStatementHistory,` + datetime.valueOf();
    //     axios
    //         .get(
    //             `https://api.allorigins.win/get?url=https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}${modules}`
    //         )
    //         .then((response) => JSON.parse(response.data.contents))
    //         .then(
    //             (res) =>
    //                 res.quoteSummary.result[0].incomeStatementHistory
    //                     .incomeStatementHistory
    //         )
    //         .then((result) => setData(processData(result.reverse())))
    //         .catch((err) => console.log(err));
    // }
    // console.log(data);

    return (
        <div className="IncomeStatement ">
            <Card>
                {incomeRevenueYearly.length === 0 ? (
                    <div
                        className="Skeleton"
                        style={{ height: "100%", width: "100%" }}
                    />
                ) : (
                    <BarChart data={incomeRevenueYearly} />
                )}
            </Card>
        </div>
    );
}
