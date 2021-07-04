import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";

//Import clsx
import clsx from "clsx";

export default function KeyStatistic({ summaryDetail }) {
    return (
        <div className="KeyStatistic">
            <Card>
                {summaryDetail.length === 0 ? (
                    <div
                        className="Skeleton"
                        style={{ height: "100%", width: "100%" }}
                    />
                ) : (
                    <div className="KeySummary">
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
