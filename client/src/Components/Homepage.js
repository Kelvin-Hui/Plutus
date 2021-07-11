import React from "react";

//Import NavDrawer
import NavDrawer from "./StyledComponents/NavDrawer";
//Import Contents
import Dashboard from "./Dashboard/Dashboard";
import SearchQuote from "./SearchQuote";
import OptionChains from "./OptionChains";
import MarketNews from "./MarketNews";
import Snackbar from "./StyledComponents/Snackbar";

export default function Homepage() {
    const [currContent, setCurrContent] = React.useState("Dashboard");

    return (
        <div className="Homepage">
            <NavDrawer
                currContent={currContent}
                setCurrContent={setCurrContent}
            />
            <Snackbar />
            {currContent === "Dashboard" && <Dashboard />}
            {currContent === "SearchQuote" && <SearchQuote />}
            {currContent === "OptionChains" && <OptionChains />}
            {currContent === "MarketNews" && <MarketNews />}
            {/* {currContent === "Backtesting" && <Backtesting />}  */}
        </div>
    );
}
