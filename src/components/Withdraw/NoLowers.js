import React from "react";
import BackButton from "../Extras/BackButton";

export const NoLowers = () => {
    return (
        <div>
            <BackButton />
            <span>
                There are no lower requests available for this account.
            </span>{" "}
        </div>
    );
};
