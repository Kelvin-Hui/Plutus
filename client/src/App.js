import React from "react";
import "./App.scss";

//Import Homepage
import Homepage from "./Components/Homepage";

//Import Login
import Login from "./Components/Auth/Login";

//Import React Router Dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Import UserContext;
import UserContext from "./Context/UserContext";

//Import Axios for API calling
import axios from "axios";

function App() {
    const [userInfo, setUserInfo] = React.useState(null);

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
                    balance: validate.data.balance,
                    portfolio: validate.data.portfolio,
                });
            } else {
                setUserInfo(null);
                return;
            }
        };
        CheckToken();
    }, []);

    return (
        <Router>
            <UserContext.Provider value={{ userInfo, setUserInfo }}>
                <Switch>
                    {userInfo !== null ? (
                        <Route path="/" exact component={Homepage} />
                    ) : (
                        <Route path="/" exact component={Login} />
                    )}
                </Switch>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
