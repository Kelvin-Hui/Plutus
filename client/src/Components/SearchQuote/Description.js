import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";

//Import Needed SVG
import { ReactComponent as Websitelogo } from "../../Assets/website.svg";

//Import clsx
import clsx from "clsx";

export default function Description({ companyInfo }) {
    return (
        <div className="Description">
            <Card H100={true}>
                {companyInfo.length === 0 ? (
                    <div
                        className="Skeleton"
                        style={{ height: "100%", width: "100%" }}
                    />
                ) : (
                    <div>
                        <div className="Header">
                            <h1 className="Title">{companyInfo.companyName}</h1>
                            <a
                                href={companyInfo.website}
                                style={{
                                    display:
                                        companyInfo.website ===
                                        (null || undefined)
                                            ? "none"
                                            : "block",
                                }}
                                target="_blank"
                            >
                                <Websitelogo className="WebsiteLogo" />
                            </a>
                        </div>

                        <div className="Tags">
                            {companyInfo.length !== 0 &&
                                companyInfo.tags.map((tag, idx) => {
                                    return (
                                        <div
                                            className="TagsItem"
                                            key={idx + tag}
                                        >
                                            {tag}
                                        </div>
                                    );
                                })}
                        </div>
                        <p className="Summary">{companyInfo.businessSummary}</p>

                        <div className="Footer">
                            <div className="Box">
                                <b>Symbol : </b>
                                <span>{companyInfo.companySymbol}</span>
                            </div>
                            <div className="Box">
                                <b>Current Price : </b>
                                <span
                                    className={clsx({
                                        Up: companyInfo.percent.raw > 0,
                                        Down: companyInfo.percent.raw < 0,
                                    })}
                                >
                                    ${companyInfo.currentPrice}
                                </span>
                            </div>
                            <div className="Box">
                                <b>Percent Change : </b>
                                <span
                                    className={clsx({
                                        Up: companyInfo.percent.raw > 0,
                                        Down: companyInfo.percent.raw < 0,
                                    })}
                                >
                                    {companyInfo.percent.raw > 0 ? "+" : null}
                                    {companyInfo.percent.fmt}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
