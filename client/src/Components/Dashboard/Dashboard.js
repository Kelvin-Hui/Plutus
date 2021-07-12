import React from "react";

//Import scss
import "./Dashboard.scss";

//Import Content Components
import AccountInfo from "./AccountInfo/AccountInfo";
import Graph from "./Graph/Graph";
import Portfolio from "./Portfolio";
import Transactions from "./Transactions";

//Import Custom Util Components
import Snackbar from "../StyledComponents/Snackbar";

//Import UserContext
import UserContext from "../../Context/UserContext";
//Import Axios for API calling
import axios from "axios";
import PieChart from "./AccountInfo/PieChart";

export default function Dashboard() {
    console.log("render dashboard");
    const { userInfo } = React.useContext(UserContext);
    const url = "http://localhost:5000/api/auth/getDashboardInfo";

    const [userData, setUserData] = React.useState({
        userPortfolio: userInfo,
        portfolioData: [],
        portfolioValue: 0,
    });

    function toggleSnackbar(status, msg) {
        var snack = document.getElementsByClassName("Snackbar")[0];

        snack.className = `Snackbar ${status} Show`;
        snack.textContent = msg;

        setTimeout(function () {
            snack.className = "Snackbar";
        }, 1900);
    }

    React.useEffect(() => {
        const getInfo = async () => {
            const res = await axios.get(url + `?userID=${userInfo.userID}`);

            if (res.data.status == "fail") {
                toggleSnackbar("Error", res.data.message);
            } else {
                console.log(res.data.data);
                setUserData(res.data.data);
            }
        };

        getInfo();
    }, []);

    return (
        <div className="Contentpage">
            <Snackbar />
            <div className="Dashboard">
                <AccountInfo
                    portfolioData={userData.portfolioData}
                    portfolioValue={userData.portfolioValue}
                    cashValue={userData.userPortfolio.balance}
                />
                <Graph
                    transactions={userData.userPortfolio.transaction}
                    portfolioValue={userData.portfolioValue}
                />
                <Portfolio
                    portfolioValue={userData.portfolioValue}
                    portfolioData={userData.portfolioData}
                />
                <Transactions
                    transactions={userData.userPortfolio.transaction}
                />
            </div>
        </div>
    );
}
