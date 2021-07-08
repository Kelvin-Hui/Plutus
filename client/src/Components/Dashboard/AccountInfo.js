import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";

export default function AccountInfo({ balance }) {
    return (
        <div className="AccountInfo">
            <Card>Portfolio Value : ${balance}</Card>
        </div>
    );
}
