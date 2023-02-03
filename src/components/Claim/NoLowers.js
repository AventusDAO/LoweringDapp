import React from "react";
import BackButton from "../Extras/BackButton";

export const NoLowers = () => {
    return (
        <div>
            <BackButton />
            <span>This account has no pending lower requests.</span>{" "}
        </div>
    );
};
