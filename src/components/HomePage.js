import LoweringForm from "./Forms/LoweringForm";
import React, { useContext } from "react";
import { stateContext } from "../Contexts/Context";
import WithdrawPage from "./WithdrawPage";

const HomePage = () => {
    const { switchChecked } = useContext(stateContext);

    return (
        <div>
            <div className="container homepage">
                <div className="row align-self-center mx-auto">
                    <div>
                        {switchChecked ? <WithdrawPage /> : <LoweringForm />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
