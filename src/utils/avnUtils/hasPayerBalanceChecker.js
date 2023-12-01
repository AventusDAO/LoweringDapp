import { genericErrorHandlerTemplate } from "../errorPopups/genericErrorPopups";
import { balanceAdjustedNotification } from "../someUIpopups";
import BigNumber from "big-number/big-number";

export const hasPayerBalanceChecker = (method, params) =>
	calculate[method](Object.assign({}, params));

const calculate = {
	proxyLowerTokenWithoutFee: (params) => proxyLowerTokenWithoutFee(params),
};

const PRIMARY_TOKEN = window?.appConfig?.NETWORK.PRIMARY_TOKEN;

async function proxyLowerTokenWithoutFee({ userFreeBalance, amount }) {
	userFreeBalance = BigNumber(userFreeBalance);
	const userFreeBalance1 = BigNumber(userFreeBalance);
	amount = BigNumber(amount);

	const remainingBalance = userFreeBalance1.minus(amount);

	if (remainingBalance.gte(0)) {
		return {
			value: true,
			amount,
		};
	} else if (userFreeBalance.lt(amount) && userFreeBalance.gte(0)) {
		const balanceAdjusted = await balanceAdjustedNotification(
			"Adjustment Required",
			`Choosing 'Continue' will lower 100% of your ${PRIMARY_TOKEN} balance.`,
			`You are not paying transaction fee for this transaction.`
		).then();
		if (balanceAdjusted) {
			return {
				value: true,
				amount: userFreeBalance,
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
		return { value: false, amount: 0 };
	}
}
