// import { weiToEthConverter } from "../randomFunctions";
import getToken from "../awt/generateAwtToken";
import { jsonRpcRequest } from "../jsonRpcRequest";
import { balanceFormatter } from "../randomFunctions";
/*
Constructs the params for the balance and the url...
Requires a valid token to get the account balance.
Queries the balance of an account. 
*/

// This function ensures that the user can only lower from the free balance.
export async function getAvtBalance({ aventusUser, awtToken, hasPayer, url }) {
    const suffix = "query";
    let params = {
        accountId: aventusUser.address,
    };
    const method = "getAccountInfo";
    if (aventusUser.address) {
        try {
            const bal = await jsonRpcRequest({
                aventusUser,
                awtToken,
                url,
                hasPayer,
                params,
                suffix,
                method,
            });
            const userBalance = bal.freeBalance;
            return userBalance;
        } catch (error) {
            throw error;
        }
    }
}

export async function getTokenBalance({
    aventusUser,
    tokenAddress,
    awtToken,
    hasPayer,
    url,
}) {
    const tokenParams = {
        accountId: aventusUser.address,
        token: tokenAddress,
    };
    const method = "getTokenBalance";
    const tokenBalance = await jsonRpcRequest({
        aventusUser,
        awtToken,
        hasPayer,
        url,
        params: tokenParams,
        suffix: "query",
        method,
    });
    return tokenBalance;
}

export async function balanceHandler({
    tokenType,
    tokenAddress,
    aventusUser,
    url,
    avtAddress,
}) {
    try {
        const { awtToken, hasPayer } = await getToken(aventusUser);
        const balance =
            tokenType === "AVT"
                ? await getAvtBalance({ aventusUser, awtToken, hasPayer, url })
                : await determineToken({
                      tokenAddress,
                      aventusUser,
                      avtAddress,
                      awtToken,
                      hasPayer,
                      url,
                  });
        return balanceFormatter(tokenType, balance);
    } catch (err) {}
}

export async function determineToken({
    tokenAddress,
    aventusUser,
    avtAddress,
    awtToken,
    hasPayer,
    url,
}) {
    if (tokenAddress === avtAddress) {
        return await getAvtBalance({ aventusUser, awtToken, hasPayer, url });
    } else {
        return await getTokenBalance({
            aventusUser,
            hasPayer,
            tokenAddress,
            awtToken,
            url,
        });
    }
}
