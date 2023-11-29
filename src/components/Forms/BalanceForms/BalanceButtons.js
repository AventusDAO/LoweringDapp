import { Spinner } from "../../Extras/Tools";
import { balanceHandler } from "../../../utils/avnUtils/queryBalance";
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
	} = useContext(stateContext);
	const { isShown, setIsShown } = useContext(balanceButtonContext);
	const [ercQueryLoading, setErcQueryLoading] = useState("");

	const mainTokenMethod = "getAvtBalance";
	const ethMethod = "getTokenBalance";
	const [mainTokenQueryLoading, setMainTokenQueryLoading] = useState("");
	const [nativeQueryLoading, setNativeQueryLoading] = useState("");

	const SUPPORTED_TOKENS = window?.appConfig?.NETWORK?.SUPPORTED_TOKENS;
	const tokenTabsKeys = Object.keys(SUPPORTED_TOKENS);

	return (
		<div
			className="tab-pane py-3 fade active show mx-auto"
			id="bal-non-token-tab-pane"
			role="tabpanel"
			aria-labelledby="bal-non-token-tab"
			tabIndex="0"
		>
			{tokenTabsKeys.includes("MAIN_TOKEN") && (
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
						balanceHandler({
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
					) : (
						SUPPORTED_TOKENS.MAIN_TOKEN.value
					)}
				</button>
			)}
			&nbsp;
			{(tokenTabsKeys.includes("ERC20") ||
				tokenTabsKeys.includes("ERC777")) && (
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
			{tokenTabsKeys.includes("NATIVE") && (
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
						balanceHandler({
							tokenType: SUPPORTED_TOKENS.NATIVE.value,
							substrateUser,
							_hasPayer,
							api,
							set_HasPayer,
							method: ethMethod,
							NATIVE_CONTRACT_ADDRESS,
							tokenAddress: NATIVE_CONTRACT_ADDRESS,
						}).then(() => setNativeQueryLoading(false));
					}}
				>
					{nativeQueryLoading ? (
						<Spinner />
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
