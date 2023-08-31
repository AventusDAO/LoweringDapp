import { genericErrorHandlerTemplate } from "../errorHandlers";
import BigNumber from "big-number/big-number";

export const balanceChecker = (method, params) =>
    calculate[method](Object.assign({}, params));

const calculate = {
    proxyLowerTokenWithFee: (params) => proxyLowerTokenWithFee(params),
    proxyLowerTokenWithoutFee: (params) => proxyLowerTokenWithoutFee(params),
};

function proxyLowerTokenWithFee({
    userBalance,
    amount,
    relayerFee,
    tokenType,
    ercTokenBalance,
}) {
    const userBalanceToBigNumber = BigNumber(userBalance);
    const relayerFeeToBigNumber = BigNumber(relayerFee);
    const amountToBigNumber = BigNumber(amount);

    const balanceAfterFee = userBalanceToBigNumber.minus(relayerFeeToBigNumber);
    if (tokenType === "AVT") {
        if (balanceAfterFee.gte(amountToBigNumber)) {
            return true;
        } else {
            genericErrorHandlerTemplate(
                "Insufficient Funds",
                "The current balance is not sufficient to lower the stated amount and pay the network fees.",
                "Please top up your AVT balance or try a smaller amount."
            );
            return false;
        }
    } else {
        if (BigNumber(ercTokenBalance).gte(amountToBigNumber)) {
            return true;
        } else {
            genericErrorHandlerTemplate(
                "Insufficient Funds",
                "The current balance is not sufficient to lower the stated amount and pay the network fees.",
                "Please top up your AVT balance or try a smaller amount."
            );
            return false;
        }
    }
}

function proxyLowerTokenWithoutFee({ userBalance, amount }) {
    const userBalanceToBigNumber = BigNumber(userBalance);
    const amountToBigNumber = BigNumber(amount);

    const remainingBalance = userBalanceToBigNumber.minus(amountToBigNumber);

    if (remainingBalance.gte(0)) {
        return {
            value: true,
            amount,
        };
    } else {
        genericErrorHandlerTemplate(
            "Insufficient Funds",
            "The current balance is not sufficient to lower the stated amount and pay the network fees.",
            "Please top up your AVT balance or try a smaller amount."
        );
        return { value: false, amount: 0 };
    }
}
