import React from "react";

//Import scss
import "./Dashboard.scss";

//Import Content Components
import AccountInfo from "./AccountInfo";
import Graph from "./Graph";
import Portfolio from "./Portfolio";
import Transactions from "./Transactions";

export default function Dashboard() {
    return (
        <div className="Contentpage">
            <div className="Dashboard">
                <AccountInfo balance={25000} />
                <Graph />
                <Portfolio />
                <Transactions />
            </div>
        </div>
    );
}
