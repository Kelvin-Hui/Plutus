import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";
//Import Axios for API calling
import axios from "axios";

export default function KeyStatistic({ summaryDetail }) {
    // const [summaryDetail, SetSummaryDetail] = React.useState({});

    // React.useEffect(() => {
    //     getSymbolInfo(symbol, "summaryDetail");
    // }, [symbol]);

    // function getSymbolInfo(symbol, query) {
    //     const datetime = new Date();
    //     const modules = `?modules=${query},` + datetime.valueOf();
    //     axios
    //         .get(
    //             `https://api.allorigins.win/get?url=https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}${modules}`
    //         )
    //         .then((response) => JSON.parse(response.data.contents))
    //         .then((res) => res.quoteSummary.result[0].summaryDetail)
    //         .then((result) =>
    //             SetSummaryDetail({
    //                 askRange: result.ask.raw + " x " + result.askSize.raw,
    //                 bidRange: result.bid.raw + " x " + result.bidSize.raw,
    //                 prevClose: result.previousClose.raw,
    //                 open: result.open.raw,
    //                 dayRange: result.dayLow.raw + " - " + result.dayHigh.raw,
    //                 fiftyTwoWeekRange:
    //                     result.fiftyTwoWeekLow.raw +
    //                     " - " +
    //                     result.fiftyTwoWeekHigh.raw,

    //                 volume: result.volume.longFmt,
    //                 avgVolume: result.averageVolume.longFmt,
    //                 fiftyMA: result.fiftyDayAverage.raw,
    //                 twoHundredMA: result.twoHundredDayAverage.raw,
    //             })
    //         )
    //         .catch((err) => console.log(err + query));
    // }
    // console.log(summaryDetail);
    return (
        <div className="KeyStatistic">
            <Card>
                {summaryDetail.length === 0 ? (
                    <div>Loading....</div>
                ) : (
                    <div className="keySummary">
                        <tbody>
                            <tr>
                                <td>
                                    <b className="key">Ask Range</b>{" "}
                                    {summaryDetail.askRange}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b className="key">Previous Close</b>{" "}
                                    {summaryDetail.prevClose}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b className="key">Day Range</b>
                                    {summaryDetail.dayRange}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b className="key">Volume</b>{" "}
                                    {summaryDetail.volume}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b className="key">50 MA</b>{" "}
                                    {summaryDetail.fiftyMA}
                                </td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <td>
                                    <b className="key">Bid Range</b>{" "}
                                    {summaryDetail.bidRange}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b className="key">Open</b>{" "}
                                    {summaryDetail.open}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b className="key">52 Week Range</b>
                                    {summaryDetail.fiftyTwoWeekRange}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b className="key">Average Volume</b>{" "}
                                    {summaryDetail.avgVolume}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b className="key">200 MA</b>{" "}
                                    {summaryDetail.twoHundredMA}
                                </td>
                            </tr>
                        </tbody>
                    </div>
                )}
            </Card>
        </div>
    );
}
