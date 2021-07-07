import React from "react";

//Import Scss
import "./StyledComponents.scss";

//Import clsx
import clsx from "clsx";

import { ReactComponent as Warninglogo } from "../../Assets/warning.svg";
import { ReactComponent as Infologo } from "../../Assets/info.svg";
import { ReactComponent as Successlogo } from "../../Assets/success.svg";
import { ReactComponent as Errorlogo } from "../../Assets/error.svg";

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
            {/* <Infologo  className={clsx({ SnackLogo: true, Info: props.Info })}/> */}
            {/* <Successlogo
                className={clsx({ SnackLogo: true, Success: props.Success })}
            />
            <Errorlogo
                className={clsx({ SnackLogo: true, Error: props.Error })}
            />
            <Warninglogo
                className={clsx({ SnackLogo: true, Warning: props.Warning })}
            /> */}
            {props.Message}
        </div>
    );
}
