import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";

export default function BuySellBtn() {
    return (
        <div className="BuySellBtn">
            <Card>
                <div>Quantity : 1 10 100</div>
                <button>Buy</button>
                <h6>Current Price : 133</h6>
                <button>Sell</button>
            </Card>
        </div>
    );
}
