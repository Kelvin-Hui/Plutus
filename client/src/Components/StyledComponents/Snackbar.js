import React from "react";

//Import Scss
import "./StyledComponents.scss";

//Import clsx
import clsx from "clsx";

import { ReactComponent as Warninglogo } from "../../Assets/warning.svg";

export default function Snackbar(props) {
    return (
        <div
            className={clsx({
                Snackbar: true,
                Error: props.Error,
                Warning: props.Warning,
                Info: props.Info,
                Success: props.Success,
            })}
        >
            {props.Warning && <Warninglogo className="SnackLogo" />}
            {props.message}
        </div>
    );
}
