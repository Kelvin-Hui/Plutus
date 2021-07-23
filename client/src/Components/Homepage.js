import React from "react";

//Import SidePanel
import SidePanel from "./StyledComponents/SidePanel";
//Import Contents
import Dashboard from "./Dashboard/Dashboard";
//import SearchQuote from "./SearchQuote";
import SearchQuote from "./SearchQuote/";
import OptionChains from "./OptionChains";
import MarketNews from "./MarketNews";

//NAV
//Import UserContext
import UserContext from "../Context/UserContext";

export default function Homepage() {
    //NAV
    const { nav } = React.useContext(UserContext);

    React.useEffect(() => {}, [nav.symbol]);

    return (
        <div className="Homepage">
            {/* <div className="MobileHeadline">
                <span>Plutus</span>
            </div> */}

            <SidePanel />

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
        </div>
    );
}
