import React from "react";

import Snackbar from "./StyledComponents/Snackbar";

function toggleSnack() {
    var snack = document.getElementsByClassName("Snackbar")[0];

    snack.className = snack.className + " Show";

    setTimeout(function () {
        snack.className = snack.className.replace("Show", "");
    }, 1400);
}
export default function TestSnackbar() {
    return (
        <>
            <Snackbar message={"warning warning"} Warning={true} />
            <button onClick={() => toggleSnack()}>Click Me</button>
        </>
    );
}
