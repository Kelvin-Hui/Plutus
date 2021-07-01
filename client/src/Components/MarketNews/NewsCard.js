import React from "react";

//Import Custom Util Components
import Card from "../StyledComponents/Card";
import Skeleton from "../StyledComponents/Skeleton";

export default function NewsCard({ data }) {
    return (
        <Card>
            <Skeleton />
        </Card>
    );
}
