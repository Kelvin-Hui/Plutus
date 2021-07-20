import React from "react";

//Import scss
import "./SearchQuote2.scss";

//Import Custom Util Components
import Card from "../StyledComponents/Card";

export default function KeyData({ keyData }) {
    const data = [
        { "Previous Close": "previousClose" },
        { Open: "open" },
        { High: "high" },
        { Low: "low" },
        { Close: "close" },
    ];
    return (
        <div className="KeyData">
            <Card>
                <table>
                    <tbody align="middle">
                        {data.map((d, idx) => {
                            return (
                                <tr key={idx}>
                                    <td
                                        className="Value"
                                        statlabel={Object.keys(d)}
                                    >
                                        {keyData[Object.values(d)]}
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
