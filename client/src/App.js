import React from "react";
import "./App.scss";

//Import React Router Dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Import UserContext;
import UserContext from "./Context/UserContext";

//Import Axios for API calling
import axios from "axios";

//Import Custom Util Components
import Spinner from "./Components/StyledComponents/Spinner";

const Homepage = React.lazy(() => import("./Components/Homepage"));
const Login = React.lazy(() => import("./Components/Auth/Login"));

function App() {
    console.log("App Rendering");
    const [userInfo, setUserInfo] = React.useState(null);
    //NAV
    const [nav, setNav] = React.useState({
        currentPage: "Dashboard",
        symbol: "AAPL",
    });

    React.useEffect(() => {
        const CheckToken = async () => {
            const token = localStorage.getItem("Auth Token");
            if (!token) {
                setUserInfo(null);
                return;
            }

            let axiosConfig = {
                headers: {
                    Authorization: token,
                },
            };

            const url = "http://localhost:5000/api/auth/validate";
            const validate = await axios.post(url, null, axiosConfig);
            if (validate.data.status === "success") {
                setUserInfo({
                    username: validate.data.username,
                    userID: validate.data.userID,
                    joinDate: new Date(validate.data.joinDate),
                    //divider
                    balance: validate.data.balance,
                    portfolio: validate.data.portfolio,
                    transaction: validate.data.transaction,
                    unitPrice: validate.data.unitPrice,
                });
            } else {
                setUserInfo(null);
                return;
            }
        };
        CheckToken();
    }, []);

    return (
        <React.Suspense fallback={<Spinner />}>
            <Router>
                <UserContext.Provider
                    //NAV
                    value={{ userInfo, setUserInfo, nav, setNav }}
                >
                    <Switch>
                        {userInfo !== null ? (
                            <Route path="/" exact component={Homepage} />
                        ) : (
                            <Route path="/" exact component={Login} />
                        )}
                    </Switch>
                </UserContext.Provider>
            </Router>
        </React.Suspense>
    );
}

export default App;
