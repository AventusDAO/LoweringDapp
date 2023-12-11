import { Spinner } from "../../Extras/Tools";
import {
	mainTokenBalanceHandler,
	nativeTokenBalanceHandler,
} from "../../../utils/avnUtils/queryBalance";
import React, { useContext, useState } from "react";
import TokenBalanceForm from "./TokenBalanceForm";
import {
	stateContext,
	queryBalanceContext,
	balanceButtonContext,
} from "../../../Contexts/Context";

const BalanceButtons = () => {
	const {
		substrateUser,
		_hasPayer,
		api,
		set_HasPayer,
		NATIVE_CONTRACT_ADDRESS,
		PRIMARY_TOKEN,
	} = useContext(stateContext);

	const { isShown, setIsShown } = useContext(balanceButtonContext);
	const [ercQueryLoading, setErcQueryLoading] = useState("");

	const mainTokenMethod = "getAvtBalance";
	const ethMethod = "getTokenBalance";
	const [mainTokenQueryLoading, setMainTokenQueryLoading] = useState("");
	const [nativeQueryLoading, setNativeQueryLoading] = useState("");

	const SUPPORTED_TOKENS = window?.appConfig?.SUPPORTED_TOKENS;
	const tokenTabsKeys = Object.keys(SUPPORTED_TOKENS);
	const onlyOneButton = tokenTabsKeys.length === 1;

	const tokenButtons = (key1, key2) => {
		let buttons;
		if (key2) {
			const button1 =
				tokenTabsKeys.includes(key1) && SUPPORTED_TOKENS[key1]?.value
					? true
					: false;
			const button2 =
				tokenTabsKeys.includes(key2) && SUPPORTED_TOKENS[key2]?.value
					? true
					: false;
			buttons = button1 || button2;
		} else {
			buttons =
				tokenTabsKeys.includes(key1) && SUPPORTED_TOKENS[key1]?.value
					? true
					: false;
		}
		return buttons;
	};

	return (
		<div
			className="tab-pane py-3 fade active show mx-auto"
			id="bal-non-token-tab-pane"
			role="tabpanel"
			aria-labelledby="bal-non-token-tab"
			tabIndex="0"
		>
			{tokenButtons("MAIN_TOKEN") && (
				<button
					className="btn submit-button custom-balance-tab-width"
					disabled={
						mainTokenQueryLoading ||
						nativeQueryLoading ||
						ercQueryLoading
					}
					type="button"
					onClick={(event) => {
						event.preventDefault();
						setIsShown(false);
						setMainTokenQueryLoading(true);
						mainTokenBalanceHandler({
							tokenType: SUPPORTED_TOKENS.MAIN_TOKEN.value,
							substrateUser,
							_hasPayer,
							api,
							set_HasPayer,
							method: mainTokenMethod,
							NATIVE_CONTRACT_ADDRESS,
						}).then(() => {
							setMainTokenQueryLoading(false);
						});
					}}
				>
					{mainTokenQueryLoading ? (
						<Spinner />
					) : onlyOneButton ? (
						`Check ${SUPPORTED_TOKENS.MAIN_TOKEN.value} Balance `
					) : (
						SUPPORTED_TOKENS.MAIN_TOKEN.value
					)}
				</button>
			)}
			&nbsp;
			{tokenButtons("ERC20", "ERC777") && (
				<button
					className="btn submit-button custom-balance-tab-width"
					disabled={
						mainTokenQueryLoading ||
						nativeQueryLoading ||
						ercQueryLoading
					}
					type="button"
					onClick={(event) => {
						event.preventDefault();
						setIsShown(!isShown);
					}}
				>
					{ercQueryLoading ? <Spinner /> : "TOKEN"}
				</button>
			)}
			&nbsp;
			{tokenButtons("NATIVE") && (
				<button
					className="btn submit-button custom-balance-tab-width"
					disabled={
						mainTokenQueryLoading ||
						nativeQueryLoading ||
						ercQueryLoading
					}
					onClick={(event) => {
						event.preventDefault();
						setNativeQueryLoading(true);
						setIsShown(false);
						nativeTokenBalanceHandler({
							tokenType: SUPPORTED_TOKENS.NATIVE.value,
							substrateUser,
							_hasPayer,
							api,
							set_HasPayer,
							method: ethMethod,
							PRIMARY_TOKEN,
							NATIVE_CONTRACT_ADDRESS,
							tokenAddress: NATIVE_CONTRACT_ADDRESS,
						}).then(() => setNativeQueryLoading(false));
					}}
				>
					{nativeQueryLoading ? (
						<Spinner />
					) : onlyOneButton ? (
						`Check ${SUPPORTED_TOKENS.NATIVE.value} Balance `
					) : (
						SUPPORTED_TOKENS.NATIVE.value
					)}
				</button>
			)}
			{/* The token form appears if set to true */}
			<queryBalanceContext.Provider
				value={{
					ercQueryLoading,
					setErcQueryLoading,
				}}
			>
				{isShown ? <TokenBalanceForm /> : ""}
			</queryBalanceContext.Provider>
		</div>
	);
};

export default BalanceButtons;
