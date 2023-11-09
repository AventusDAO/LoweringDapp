import { genericErrorHandlerTemplate } from "../errorHandlers";
import { balanceAdjustedNotification } from "../someUIpopups";
import BigNumber from "big-number/big-number";
import balanceConverter from "ethereum-unit-converter";

export const balanceChecker = (method, params) =>
    calculate[method](Object.assign({}, params));

const calculate = {
    proxyLowerTokenWithFee: (params) => proxyLowerTokenWithFee(params),
    proxyLowerTokenWithoutFee: (params) => proxyLowerTokenWithoutFee(params),
};

async function proxyLowerTokenWithFee({
    userBalance,
    amount,
    relayerFee,
    tokenType,
    ercTokenBalance,
}) {
    userBalance = BigNumber(userBalance);
    relayerFee = BigNumber(relayerFee);
    amount = BigNumber(amount);

    const balanceAfterFee = userBalance.minus(relayerFee);
    if (tokenType === "AVT") {
        if (balanceAfterFee.gte(amount)) {
            return {
                value: true,
                amount,
            };
        } else if (balanceAfterFee.lt(amount) && balanceAfterFee.gte(0)) {
            const balanceAdjusted = await balanceAdjustedNotification(
                "Adjustment Required",
                "Choosing 'Continue' will lower 100% of your AVT balance.",
                `After paying the transaction fee (d${balanceConverter(
                    relayerFee,
                    "wei",
                    "eth"
                )} AVT), the amount you specified is larger than your AVT balance.`
            ).then();
            if (balanceAdjusted) {
                return {
                    value: true,
                    amount: balanceAfterFee,
                };
            } else {
                return {
                    value: false,
                    amount: 0,
                };
            }
        } else {
            genericErrorHandlerTemplate(
                "Insufficient Funds",
                "The current balance is not sufficient to lower the stated amount and pay the network fees.",
                "Please top up your AVT balance or try a smaller amount."
            );
            return {
                value: false,
                amount: 0,
            };
        }
    } else {
        if (BigNumber(ercTokenBalance).gte(amount)) {
            if (balanceAfterFee.gte(0)) {
                return {
                    value: true,
                    amount,
                };
            } else {
                genericErrorHandlerTemplate(
                    "Insufficient Funds",
                    "The current AVT balance is not sufficient to pay the network fees.",
                    "Please top up your AVT balance or try a smaller amount."
                );
            }
        } else {
            genericErrorHandlerTemplate(
                "Insufficient Funds",
                "The current balance is not sufficient to lower the stated amount."
            );
            return {
                value: false,
                amount: 0,
            };
        }
    }
}

async function proxyLowerTokenWithoutFee({ userBalance, amount }) {
    userBalance = BigNumber(userBalance);
    const userBalance1 = BigNumber(userBalance);
    amount = BigNumber(amount);

    const remainingBalance = userBalance1.minus(amount);

    if (remainingBalance.gte(0)) {
        return {
            value: true,
            amount,
        };
    } else if (userBalance.lt(amount) && userBalance.gte(0)) {
        const balanceAdjusted = await balanceAdjustedNotification(
            "Adjustment Required",
            "Choosing 'Continue' will lower 100% of your AVT balance.",
            `You are not paying transaction fee for this transaction.`
        ).then();
        if (balanceAdjusted) {
            return {
                value: true,
                amount: userBalance,
            };
        } else {
            return {
                value: false,
                amount: 0,
            };
        }
    } else {
        genericErrorHandlerTemplate(
            "Insufficient Funds",
            "The current balance is not sufficient to lower the stated amount and pay the network fees.",
            "Please top up your AVT balance or try a smaller amount."
        );
        return { value: false, amount: 0 };
    }
}
