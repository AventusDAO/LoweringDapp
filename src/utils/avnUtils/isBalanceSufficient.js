import { balanceChecker } from "./balanceChecker";
import { hasPayerBalanceChecker } from "./hasPayerBalanceChecker";
import { getAvtFreeBalance, getTokenBalance } from "./queryBalance";
/*
Constructs the params for the balance and the url...
Requires a valid token to get the account balance.
Queries the balance of an account. 
*/
const token = window?.appConfig?.NETWORK?.SUPPORTED_TOKENS[0];

export async function isBalanceSufficient({ params }) {
	try {
		const userFreeBalance = await getAvtFreeBalance({
			params,
		});
		let ercTokenBalance;

		if (params.tokenType !== "TOKEN") {
			ercTokenBalance =
				params.tokenType === token
					? await getAvtFreeBalance({
							params,
					  })
					: await getTokenBalance({
							params,
					  });
		}

		let relayerFee;
		if (!params._hasPayer) {
			relayerFee = await params?.api.query.getRelayerFees(
				params.relayer,
				params.substrateUser.address,
				params.method
			);
		}

		const calcParams = {
			userFreeBalance,
			amount: params.amount,
			relayerFee,
			tokenType: params.tokenType,
			ercTokenBalance,
		};
		const hasSufficientBalance = params._hasPayer
			? await hasPayerBalanceChecker(
					"proxyLowerTokenWithoutFee",
					calcParams
			  )
			: await balanceChecker("proxyLowerTokenWithFee", calcParams);
		return hasSufficientBalance;
	} catch (err) {
		console.error(err);
	}
}
