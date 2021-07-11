import React from "react";

//Import Scss
import "./StyledComponents.scss";
//Import clsx
import clsx from "clsx";

//Import Needed SVG
import PlutusLogo from "../../Assets/Plutus Icon.svg";
import { ReactComponent as Homepagelogo } from "../../Assets/homepage.svg";
import { ReactComponent as Dashboardlogo } from "../../Assets/dashboard.svg";
import { ReactComponent as Searchquotelogo } from "../../Assets/searchquote.svg";
import { ReactComponent as Optionchainslogo } from "../../Assets/optionchains.svg";
import { ReactComponent as Marketnewslogo } from "../../Assets/marketnews.svg";
import { ReactComponent as Backtestinglogo } from "../../Assets/backtesting.svg";
import { ReactComponent as Settinglogo } from "../../Assets/setting.svg";
import { ReactComponent as Logoutlogo } from "../../Assets/logout.svg";

//Import UserContext
import UserContext from "../../Context/UserContext";

//Import Custom Util Components
import Divider from "./Divider";
import Snackbar from "../StyledComponents/Snackbar";
import Dialog from "./Dialog";

//Import Axios for API calling
import axios from "axios";

//Nav Drawer For The Home Page.
export default function NavDrawer({ currContent, setCurrContent }) {
    const { userInfo, setUserInfo } = React.useContext(UserContext);
    const [open, setOpen] = React.useState(false);

    const url = "http://localhost:5000/api/order/reset";

    function toggleSnackbar(status, msg) {
        var snack = document.getElementsByClassName("Snackbar")[0];

        snack.className = `Snackbar ${status} Show`;
        snack.textContent = msg;

        setTimeout(function () {
            snack.className = "Snackbar";
        }, 1900);
    }

    function reset(e) {
        e.preventDefault();
        const resetOrder = async () => {
            const res = await axios.post(url, {
                userID: userInfo.userID,
            });
            if (res.data.status == "fail") {
                toggleSnackbar("Error", res.data.message);
            } else {
                toggleSnackbar("Success", res.data.message);
            }
        };
        resetOrder();
    }

    return (
        <div className="NavDrawer">
            {/*Brand and Logo*/}
            <Dialog open={open} setOpen={setOpen}>
                {/* <Snackbar /> */}
                <button onClick={(e) => reset(e)}>Reset Button!</button>
            </Dialog>
            <div className="TitleLogo">
                <img src={PlutusLogo} alt="logo" className="NavLogo" />
                <h2>Plutus</h2>
            </div>

            {/*User Greeting*/}
            <h2 className="Greeting">Welcome! {userInfo.username}</h2>

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

                <div
                    className={clsx({ NavItem: true })}
                    onClick={() => setOpen(true)}
                >
                    <Settinglogo className="NavItemsLogo" />
                    Setting
                </div>

                <div
                    className={clsx({ NavItem: true })}
                    onClick={() => {
                        setUserInfo(null);
                        localStorage.removeItem("Auth Token");
                    }}
                >
                    <Logoutlogo className="NavItemsLogo" />
                    LogOut
                </div>
            </div>
        </div>
    );
}
