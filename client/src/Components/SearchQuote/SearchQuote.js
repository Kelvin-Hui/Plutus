import React from "react";

//Import scss
import "./SearchQuote.scss";

//Import SearchInput
import SearchInput from "../StyledComponents/SearchInput";

//Import Axios for API calling
import axios from "axios";

//Import Content Components
import Description from "./Description";
import Chart from "./Chart/Chart";
import KeyStatistic from "./KeyStatistic";
import IncomeStatement from "./Financial/IncomeStatement";

export default function SearchQuote() {
    console.log("rendered SQ");
    const [symbol, setSymbol] = React.useState("AAPL");
    const [data, setData] = React.useState({
        companyInfo: [],
        incomeRevenueYearly: [],
        ohlcData: [],
        summaryDetail: [],
    });

    React.useEffect(() => {
        const fetchData = async () => {
            const res_Summary = await axios.get(
                `http://localhost:5000/api/searchQuote?symbol=${symbol}&type=Summary`
            );
            const res_Chart = await axios.get(
                `http://localhost:5000/api/searchQuote?symbol=${symbol}&type=Chart`
            );
            setData({
                companyInfo: res_Summary.data.data.companyInfo,
                incomeRevenueYearly: res_Summary.data.data.incomeRevenueYearly,
                ohlcData: res_Chart.data.data.ohlcData,
                summaryDetail: res_Chart.data.data.summaryDetail,
            });
        };

        fetchData();
    }, [symbol]);

    return (
        <div className="Contentpage">
            <SearchInput
                placeholder="Search For Stock Quote (default : AAPL)"
                setSymbol={setSymbol}
            />
            <div className="CardGrid_SearchQuote">
                <Chart symbol={symbol} ohlcData={data.ohlcData} />
                <KeyStatistic summaryDetail={data.summaryDetail} />
                <Description companyInfo={data.companyInfo} />
                <IncomeStatement
                    incomeRevenueYearly={data.incomeRevenueYearly}
                />
            </div>
        </div>
    );
}
