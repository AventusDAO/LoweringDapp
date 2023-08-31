import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import { clearToken } from "../../utils/awt/generateAwtToken";

const GenerateNewToken = () => {
    const { aventusUser } = useContext(stateContext);

    return (
        <>
            <div className="text-end">
                <button
                    className="btn generate-new-token-button"
                    onClick={() => {
                        clearToken(aventusUser);
                    }}
                >
                    Generate New Token
                </button>
                <br />
            </div>
        </>
    );
};

export default GenerateNewToken;
