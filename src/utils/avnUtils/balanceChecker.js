import { genericErrorHandlerTemplate } from "../errorPopups/genericErrorPopups";
import { balanceAdjustedNotification } from "../someUIpopups";
import BigNumber from "big-number/big-number";
import balanceConverter from "ethereum-unit-converter";

export const balanceChecker = (method, params) =>
	calculate[method](Object.assign({}, params));

const calculate = {
	proxyLowerTokenWithFee: (params) => proxyLowerTokenWithFee(params),
};

const PRIMARY_TOKEN = window?.appConfig?.PRIMARY_TOKEN;

async function proxyLowerTokenWithFee({
	userFreeBalance,
	amount,
	relayerFee,
	tokenType,
	ercTokenBalance,
}) {
	userFreeBalance = BigNumber(userFreeBalance);
	relayerFee = BigNumber(relayerFee);
	amount = BigNumber(amount);

	const balanceAfterFee = userFreeBalance.minus(relayerFee);
	if (tokenType === PRIMARY_TOKEN) {
		if (balanceAfterFee.gte(amount)) {
			return {
				value: true,
				amount,
			};
		} else if (balanceAfterFee.lt(amount) && balanceAfterFee.gte(0)) {
			const balanceAdjusted = await balanceAdjustedNotification(
				"Adjustment Required",
				`Choosing 'Continue' will lower 100% of your ${PRIMARY_TOKEN} balance.`,
				`After paying the transaction fee (${balanceConverter(
					relayerFee,
					"wei",
					"eth"
				)} ${PRIMARY_TOKEN}), the amount you specified is larger than your ${PRIMARY_TOKEN} balance.`
			);
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
				`Please top up your ${PRIMARY_TOKEN} balance or try a smaller amount.`
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
					`The current ${PRIMARY_TOKEN} balance is not sufficient to pay the network fees.`,
					`Please top up your ${PRIMARY_TOKEN} balance or try a smaller amount.`
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
