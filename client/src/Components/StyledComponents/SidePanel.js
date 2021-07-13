import React from "react";

//Import Scss
import "./StyledComponents2.scss";

//Import Needed SVG
import { ReactComponent as Dashboardlogo } from "../../Assets/dashboard.svg";
import { ReactComponent as Searchquotelogo } from "../../Assets/searchquote.svg";
import { ReactComponent as Optionchainslogo } from "../../Assets/optionchains.svg";
import { ReactComponent as Marketnewslogo } from "../../Assets/marketnews.svg";

import { ReactComponent as Settinglogo } from "../../Assets/setting.svg";
import { ReactComponent as Logoutlogo } from "../../Assets/logout.svg";

import { ReactComponent as Doubleleftarrowlogo } from "../../Assets/doubleleftarrow.svg";
import { ReactComponent as Doublerightarrowlogo } from "../../Assets/doublerightarrow.svg";

//Import UserContext
import UserContext from "../../Context/UserContext";

//Import Custom Util Components
import Divider from "./Divider";
import Dialog from "./Dialog";

//Import Axios for API calling
import axios from "axios";
//Import clsx
import clsx from "clsx";

export default function SidePanel() {
    const [collapsed, setCollapsed] = React.useState(false);
    const { userInfo, setUserInfo, nav, setNav } =
        React.useContext(UserContext);
    const icons = [
        <Dashboardlogo className="NavItemIcon" />,
        <Searchquotelogo className="NavItemIcon" />,
        <Optionchainslogo className="NavItemIcon" />,
        <Marketnewslogo className="NavItemIcon" />,
        <Settinglogo className="NavItemIcon" />,
        <Logoutlogo className="NavItemIcon" />,
    ];
    return (
        <div className={clsx({ SidePanel: true, Collapsed: collapsed })}>
            <div className="TitleLogo">
                <span className={clsx({ Collapsed: collapsed })}>Plutus</span>
            </div>
            <ul className="NavItems">
                {[
                    "Dashboard",
                    "Search Quote",
                    "Option Chains",
                    "Market News",
                ].map((item, idx) => (
                    <React.Fragment key={idx}>
                        <div
                            className={clsx({
                                NavItem: true,
                                Collapsed: collapsed,
                                Selected: nav.currentPage === item,
                            })}
                            content=""
                            tooltip={item}
                            onClick={() =>
                                nav.currentPage !== item &&
                                setNav({ ...nav, currentPage: item })
                            }
                        >
                            <div>{icons[idx]}</div>
                            <span className="NavItemText">{item}</span>
                        </div>
                    </React.Fragment>
                ))}
                <Divider style={{ marginTop: "auto" }} />

                <div
                    className={clsx({
                        NavItem: true,
                        Collapsed: collapsed,
                    })}
                    key={4}
                    tooltip="Setting"
                >
                    <Settinglogo className="NavItemIcon" />
                    <span className="NavItemText">Setting</span>
                </div>
                <div
                    className={clsx({
                        NavItem: true,
                        Collapsed: collapsed,
                    })}
                    key={5}
                    tooltip="Log Out"
                    onClick={() => {
                        setUserInfo(null);
                        localStorage.removeItem("Auth Token");
                    }}
                >
                    <Logoutlogo className="NavItemIcon" />
                    <span className="NavItemText">Log Out</span>
                </div>

                <div
                    className="NavItem"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? (
                        <Doublerightarrowlogo className="NavItemIcon" />
                    ) : (
                        <Doubleleftarrowlogo className="NavItemIcon" />
                    )}
                </div>
            </ul>
        </div>
    );
}
