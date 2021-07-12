import React from "react";

//Import NavDrawer
import NavDrawer from "./StyledComponents/NavDrawer";
//Import Contents
import Dashboard from "./Dashboard/Dashboard";
import SearchQuote from "./SearchQuote";
import OptionChains from "./OptionChains";
import MarketNews from "./MarketNews";

//NAV
//Import UserContext
import UserContext from "../Context/UserContext";

export default function Homepage() {
    //NAV
    const { nav } = React.useContext(UserContext);
    //const [currContent, setCurrContent] = React.useState("Dashboard");

    React.useEffect(() => {}, [nav.symbol]);

    return (
        <div className="Homepage">
            <NavDrawer />
            {/* <NavDrawer
            currContent={currContent}
            setCurrContent={setCurrContent}
            /> */}
            {/* //Nav */}
            {nav.currentPage === "Dashboard" && <Dashboard />}
            {nav.currentPage === "SearchQuote" && (
                <SearchQuote symbol={nav.symbol} />
            )}
            {nav.currentPage === "OptionChains" && (
                <OptionChains symbol={nav.symbol} />
            )}
            {nav.currentPage === "MarketNews" && (
                <MarketNews symbol={nav.symbol} />
            )}

            {/* {currContent === "Dashboard" && <Dashboard />}
            {currContent === "SearchQuote" && <SearchQuote />}
            {currContent === "OptionChains" && <OptionChains />}
            {currContent === "MarketNews" && <MarketNews />} */}
            {/* {currContent === "Backtesting" && <Backtesting />}  */}
        </div>
    );
}
