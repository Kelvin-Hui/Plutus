import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";

export default function Description({ companyInfo }) {
    return (
        <div className="Description">
            <Card>
                {companyInfo.length === 0 ? (
                    <div>Loading....</div>
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
                )}
            </Card>
        </div>
    );
}
