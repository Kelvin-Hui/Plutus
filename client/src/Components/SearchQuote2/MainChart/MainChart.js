import React from "react";

//Import scss
import "./MainChart.scss";

//Import Custom Util Components
import Card from "../../StyledComponents/Card";
import Divider from "../../StyledComponents/Divider";

//Import clsx
import clsx from "clsx";

//Import UserContext
import UserContext from "../../../Context/UserContext";

//Import Content Components
import Overview from "../MainChart/Overview";
import Chart from "../MainChart/Chart";
import Statistic from "../MainChart/Statistic";
import RevenueEarning from "../MainChart/RevenueEarning";
import Financial from "../MainChart/Financial";

export default function MainChart({ previousClose }) {
    const { userInfo, setUserInfo, nav, setNav } =
        React.useContext(UserContext);
    const [currentTab, setCurrentTab] = React.useState("Chart");
    const Tabs = [
        "Overview",
        "Chart",
        "Statistic",
        "Revenue & Earning",
        "Financial",
        "Options",
        "News",
    ];

    function switchTab(e, col) {
        e.preventDefault();
        if (col === "Options") {
            setNav({ ...nav, currentPage: "Option Chains" });
        }
        if (col === "News") {
            setNav({ ...nav, currentPage: "Market News" });
        } else {
            setCurrentTab(col);
        }
    }

    return (
        <div className="MainChart">
            <ul className="Columns">
                {Tabs.map((col, idx) => (
                    <li
                        className={clsx({
                            Options: true,
                            Current: currentTab === col,
                        })}
                        onClick={(e) => switchTab(e, col)}
                        key={idx}
                    >
                        {col}
                    </li>
                ))}
            </ul>
            {/* <Divider /> */}
            <Card>
                {currentTab === "Overview" && <Overview />}
                {currentTab === "Chart" && (
                    <Chart previousClose={previousClose} symbol={nav.symbol} />
                )}
                {currentTab === "Statistic" && <Statistic />}
                {currentTab === "RevenueEarning" && <RevenueEarning />}
                {currentTab === "Financil" && <Financial />}
            </Card>
        </div>
    );
}
