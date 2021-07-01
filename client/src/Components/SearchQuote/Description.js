import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";
import Skeleton from "../StyledComponents/Skeleton";

//Import clsx
import clsx from "clsx";

export default function Description({ companyInfo }) {
    return (
        <div className="Description">
            <Card>
                <h3
                    className={clsx({
                        Title: true,
                        Skeleton: companyInfo.length === 0,
                    })}
                >
                    {companyInfo.companyName} {companyInfo.website}
                </h3>
                <div
                    className={clsx({
                        Tags: true,
                        Skeleton: companyInfo.length === 0,
                    })}
                >
                    {companyInfo.length !== 0 &&
                        companyInfo.tags.map((tag, idx) => {
                            return (
                                <div className="TagsItem" key={idx + tag}>
                                    {tag}
                                </div>
                            );
                        })}
                </div>
                <p
                    className={clsx({
                        Summary: true,
                        Skeleton: companyInfo.length === 0,
                    })}
                >
                    {companyInfo.businessSummary}
                </p>

                {/* {companyInfo.length === 0 ? (
                    <div className="Skeleton">Loading...</div>
                ) : (
                    <>
                        <h3 className="Title">
                            {companyInfo.companyName} {companyInfo.website}
                        </h3>
                        <div className="Tags">
                            {companyInfo.tags.map((tag, idx) => {
                                return (
                                    <div className="TagsItem" key={idx + tag}>
                                        {tag}
                                    </div>
                                );
                            })}
                        </div>

                        <p className="Summary">{companyInfo.businessSummary}</p>
                        <div className="CurrentPrice">
                            {companyInfo.currentPrice} {companyInfo.percent.fmt}
                        </div>
                    </>
                )} */}
            </Card>
        </div>
    );
}
