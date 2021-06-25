import React from "react";

//Import NavDrawer
import NavDrawer from "./StyledComponents/NavDrawer";
//Import Contents
import SearchQuote from "./SearchQuote";
import OptionChains from "./OptionChains/OptionChains";

export default function Homepage() {
    const [currContent, setCurrContent] = React.useState("Dashboard");
    return (
        <div className="Homepage">
            <NavDrawer
                currContent={currContent}
                setCurrContent={setCurrContent}
            />
            {/* {currContent === "Dashboard" && <Dashboard />} */}
            {currContent === "SearchQuote" && <SearchQuote />}
            {currContent === "OptionChains" && <OptionChains />}
            {/* {currContent === "MarketNews" && <MarketNews />}
            {currContent === "Backtesting" && <Backtesting />}  */}
        </div>
    );
}
