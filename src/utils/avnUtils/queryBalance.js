// import { weiToEthConverter } from "../randomFunctions";
import { balanceFormatter } from "../randomFunctions";
import {
	gatewayAccessErrorForNoMinimumBalance,
	gatewayAccessErrorForNoPayer,
} from "../errorPopups/networkAccessErrorPopups";
/*
Constructs the params for the balance and the url...
Requires a valid token to get the account balance.
Queries the balance of an account. 
*/

// This function ensures that the user can only lower from the free balance.
export async function getPrimaryTokenFreeBalance({ params }) {
	try {
		const bal = await params?.api.query.getAccountInfo(
			params.substrateUser.address
		);
		const userFreeBalance = bal.freeBalance;
		return userFreeBalance;
	} catch (err) {
		if (err.message.includes("403")) {
			const result = params._hasPayer
				? await gatewayAccessErrorForNoPayer()
				: await gatewayAccessErrorForNoMinimumBalance();
			params.set_HasPayer(result);
		}
		return null;
	}
}

export async function getTokenBalance({ params }) {
	try {
		const tokenBalance = await params?.api.query.getTokenBalance(
			params.substrateUser.address,
			params.tokenAddress
		);
		return tokenBalance;
	} catch (err) {
		if (err.message.includes("403")) {
			const result = params._hasPayer
				? await gatewayAccessErrorForNoPayer()
				: await gatewayAccessErrorForNoMinimumBalance();
			params.set_HasPayer(result);
		}
	}
}

const SUPPORTED_TOKENS = window?.appConfig?.NETWORK?.SUPPORTED_TOKENS;

export async function balanceHandler({
	tokenType,
	tokenAddress,
	substrateUser,
	api,
	isBalanceTab,
	_hasPayer,
	PRIMARY_TOKEN_ADDRESS,
	set_HasPayer,
}) {
	const params = {
		tokenAddress,
		substrateUser,
		_hasPayer,
		api,
		isBalanceTab,
		set_HasPayer,
	};
	try {
		tokenType =
			tokenAddress === PRIMARY_TOKEN_ADDRESS
				? SUPPORTED_TOKENS.PRIMARY_TOKEN.value
				: tokenType;
		const balance =
			tokenType === SUPPORTED_TOKENS.PRIMARY_TOKEN.value
				? await getPrimaryTokenFreeBalance({
						params,
				  })
				: await getTokenBalance({
						params,
				  });
		return balanceFormatter({ tokenType, balance });
	} catch (error) {}
}
