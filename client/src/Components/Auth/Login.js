import React from "react";

//Import Scss
import "./Auth.scss";

//Import Needed SVG
import PlutusLogo from "../../Assets/Plutus Icon.svg";
import AccountLogo from "../../Assets/account.svg";

export default function Login() {
    function toggleFlip() {
        const form = document.querySelector(".Form");

        console.log(form);

        if (form.className === "Form") {
            form.className = "Form Flipped";
        } else if (form.className === "Form Flipped") {
            form.className = "Form";
        }
    }

    return (
        <>
            <div className="LoginPage">
                <div className="LogoName">
                    <img src={PlutusLogo} alt="logo" className="Logo" />
                    <div className="Name">
                        <h1>Plutus</h1>
                        <span>
                            Learn How To Invest and Analyze Stock Online
                        </span>
                    </div>
                </div>

                <div className="Login">
                    <div className="Form">
                        <div className="Face Front" id="Front">
                            <img
                                src={AccountLogo}
                                alt="account"
                                className="AccountLogo"
                            />
                            <input placeholder="UserName"></input>
                            <input
                                type="password"
                                placeholder="Password"
                            ></input>
                            <span onClick={() => toggleFlip()}>
                                New Here? Create Account!
                            </span>
                            <button className="Ripple">Login</button>
                        </div>
                        <div className="Face Back" id="Back">
                            <img
                                src={AccountLogo}
                                alt="account"
                                className="AccountLogo"
                            />
                            <input placeholder="UserName"></input>
                            <input
                                type="password"
                                placeholder="Password"
                            ></input>
                            <span onClick={() => toggleFlip()}>
                                Already Have An Account? Log In!
                            </span>
                            <button className="Ripple">Create</button>
                        </div>
                    </div>
                </div>

                <div className="Footer">Kelvin Hui ©2021</div>
            </div>
        </>
    );
}
