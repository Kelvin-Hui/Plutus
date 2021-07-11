import React from "react";

//Import scss
import "./Dashboard.scss";

//Import Content Components
import AccountInfo from "./AccountInfo/AccountInfo";
import Graph from "./Graph";
import Portfolio from "./Portfolio";
import Transactions from "./Transactions";

//Import UserContext
import UserContext from "../../Context/UserContext";
//Import Axios for API calling
import axios from "axios";

export default function Dashboard() {
    console.log("render dashboard");
    const { userInfo } = React.useContext(UserContext);
    const url = "http://localhost:5000/api/auth/getInfo";

    const [userData, setUserData] = React.useState(userInfo);

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
                if (res.data.data.balance != userInfo.balance) {
                    setUserData(res.data.data);
                }
            }
        };

        getInfo();
    }, []);

    return (
        <div className="Contentpage">
            <div className="Dashboard">
                <AccountInfo balance={userData.balance} />
                <Graph />
                <Portfolio
                    balance={userData.balance}
                    portfolio={userData.portfolio}
                    unitPrice={userData.unitPrice}
                />
                <Transactions
                    transactions={userData.transaction.sort(
                        (a, b) => Date.parse(b.date) - Date.parse(a.date)
                    )}
                />
            </div>
        </div>
    );
}
