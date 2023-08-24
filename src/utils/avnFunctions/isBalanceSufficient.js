import { getRelayerFees } from "./getRelayerFees";
import { balanceChecker } from "./balanceChecker";
import { getAvtBalance, determineToken } from "./queryBalance";
/*
Constructs the params for the balance and the url...
Requires a valid token to get the account balance.
Queries the balance of an account. 
*/

export async function isBalanceSufficient({
    avtAddress,
    params,
    awtToken,
    hasPayer,
    url,
}) {
    let ercTokenBalance;
    if (params.tokenType !== "AVT") {
        ercTokenBalance = await determineToken({
            aventusUser: params.aventusUser,
            tokenAddress: params.tokenAddress,
            awtToken,
            hasPayer,
            avtAddress,
            url,
        });
    }
    const userBalance = await getAvtBalance({
        aventusUser: params.aventusUser,
        awtToken,
        hasPayer,
        url,
    });

    let relayerFee;
    if (!hasPayer) {
        relayerFee = await getRelayerFees({
            relayer: params.relayer,
            aventusUser: params.aventusUser,
            method: params.method,
            url,
            awtToken,
            hasPayer,
        });
    }

    const calcParams = {
        userBalance,
        amount: params.amount,
        relayerFee,
        tokenType: params.tokenType,
        ercTokenBalance,
    };
    const hasSufficientBalance = hasPayer
        ? balanceChecker("proxyLowerTokenWithoutFee", calcParams)
        : balanceChecker("proxyLowerTokenWithFee", calcParams);
    return hasSufficientBalance;
}
