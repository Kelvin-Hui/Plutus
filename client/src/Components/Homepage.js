import React from "react";

//Import NavDrawer
import NavDrawer from "./StyledComponents/NavDrawer";
//Import Contents
import Dashboard from "./Dashboard/Dashboard";
//import SearchQuote from "./SearchQuote";
import SearchQuote from "./SearchQuote2/";
import OptionChains from "./OptionChains";
import MarketNews from "./MarketNews";

//NAV
//Import UserContext
import UserContext from "../Context/UserContext";
import SidePanel from "./StyledComponents/SidePanel";

export default function Homepage() {
    //NAV
    const { nav } = React.useContext(UserContext);
    //const [currContent, setCurrContent] = React.useState("Dashboard");

    React.useEffect(() => {}, [nav.symbol]);

    return (
        <div className="Homepage">
            {/* <NavDrawer /> */}
            <SidePanel />
            {/* <NavDrawer
            currContent={currContent}
            setCurrContent={setCurrContent}
            /> */}
            {/* //Nav */}
            {nav.currentPage === "Dashboard" && <Dashboard />}
            {nav.currentPage === "Search Quote" && (
                <SearchQuote symbol={nav.symbol} />
            )}
            {nav.currentPage === "Option Chains" && (
                <OptionChains symbol={nav.symbol} />
            )}
            {nav.currentPage === "Market News" && (
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
