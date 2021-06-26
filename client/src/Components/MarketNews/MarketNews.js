import React from "react";

//Import scss
import "./MarketNews.scss";
//Import SearchInput
import SearchInput from "../StyledComponents/SearchInput";
//Import Axios for API calling
import axios from "axios";
//Import NewsCard
import NewsCard from "./NewsCard";

export default function MarketNews() {
    const [symbol, setSymbol] = React.useState(null);

    const sampleData = ["1", "2", "3", "1", "2", "3", "1", "2", "3"];
    return (
        <div className="Contentpage">
            <SearchInput
                placeholder="Search For Stock Quote (default : AAPL)"
                setSymbol={setSymbol}
            />
            <div className="NewsCardGrid">
                {sampleData.map((data, idx) => {
                    return <NewsCard key={idx} data={data} />;
                })}
            </div>
        </div>
    );
}
