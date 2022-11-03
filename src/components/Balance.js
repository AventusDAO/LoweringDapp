import React, { useContext } from "react";
import { stateContext } from "../Contexts/Context";
// import { queryState } from "../functions/stakeSubmitHandlers";

const StakingBalance = () => {
    const {
        sender,
        setAvtBalance,
        setStakingBalance,
        avtBalance,
        stakingBalance,
    } = useContext(stateContext);
    let balance = "";
    const url = "https://testnet.gateway.aventus.io/";
    if (sender.address !== undefined) {
        const senderAddress = sender.address;
        const params = { accountId: senderAddress };
        // const balance = queryState(sender, url, "getAccountInfo", params).then(
        //     (val) => {
        //         return val;
        //     }
        // );
    }
    return (
        <>
            <span>Staking Balance</span>
            <span>{sender && balance}</span>
        </>
    );
};

export default StakingBalance;
