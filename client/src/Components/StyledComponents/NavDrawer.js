import React from "react";
//Import Scss
import "./StyledComponents.scss";
//Import clsx
import clsx from "clsx";

//Import Needed SVG
import logo from "../../Assets/Logosvg.svg";
import { ReactComponent as Homepagelogo } from "../../Assets/homepage.svg";
import { ReactComponent as Dashboardlogo } from "../../Assets/dashboard.svg";
import { ReactComponent as Searchquotelogo } from "../../Assets/searchquote.svg";
import { ReactComponent as Optionchainslogo } from "../../Assets/optionchains.svg";
import { ReactComponent as Marketnewslogo } from "../../Assets/marketnews.svg";
import { ReactComponent as Backtestinglogo } from "../../Assets/backtesting.svg";
import { ReactComponent as Settinglogo } from "../../Assets/setting.svg";
import { ReactComponent as Logoutlogo } from "../../Assets/logout.svg";

import Divider from "./Divider";

//Nav Drawer For The Home Page.
export default function NavDrawer({ currContent, setCurrContent }) {
    return (
        <div className="NavDrawer">
            {/*Brand and Logo*/}
            <div className="TitleLogo">
                <img src={logo} alt="logo" className="NavLogo" />
                <h2>Plutus</h2>
            </div>

            {/*User Greeting*/}
            <h2 className="Greeting">Welcome!</h2>

            {/*Navigation Items*/}
            <div className="NavItems">
                <div
                    className={clsx({
                        NavItem: true,
                    })}
                    onClick={() => setCurrContent("Homepage")}
                >
                    <Homepagelogo className="NavItemsLogo" />
                    Home
                </div>

                <Divider />

                <div
                    className={clsx({
                        NavItem: true,
                        NavItemSelected: currContent === "Dashboard",
                    })}
                    onClick={() => setCurrContent("Dashboard")}
                >
                    <Dashboardlogo className="NavItemsLogo" />
                    Dashboard
                </div>

                <div
                    className={clsx({
                        NavItem: true,
                        NavItemSelected: currContent === "SearchQuote",
                    })}
                    onClick={() => setCurrContent("SearchQuote")}
                >
                    <Searchquotelogo className="NavItemsLogo" />
                    Search Quote
                </div>

                <div
                    className={clsx({
                        NavItem: true,
                        NavItemSelected: currContent === "OptionChains",
                    })}
                    onClick={() => setCurrContent("OptionChains")}
                >
                    <Optionchainslogo className="NavItemsLogo" />
                    Option Chains
                </div>

                <div
                    className={clsx({
                        NavItem: true,
                        NavItemSelected: currContent === "MarketNews",
                    })}
                    onClick={() => setCurrContent("MarketNews")}
                >
                    <Marketnewslogo className="NavItemsLogo" />
                    Market News
                </div>

                <div
                    className={clsx({
                        NavItem: true,
                        NavItemSelected: currContent === "Backtesting",
                    })}
                    onClick={() => setCurrContent("Backtesting")}
                >
                    <Backtestinglogo className="NavItemsLogo" />
                    BackTesting
                </div>

                <Divider />

                <div className={clsx({ NavItem: true })}>
                    <Settinglogo className="NavItemsLogo" />
                    Setting
                </div>

                <div className={clsx({ NavItem: true })}>
                    <Logoutlogo className="NavItemsLogo" />
                    LogOut
                </div>
            </div>
        </div>
    );
}
