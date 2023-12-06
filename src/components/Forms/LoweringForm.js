import React, { useState, useContext } from "react";
import MainTokenLoweringForm from "./lowerForms/MainTokenLoweringForm";
import Erc20LoweringForm from "./lowerForms/Erc20LoweringForm";
import Erc777LoweringForm from "./lowerForms/Erc777LoweringForm";
import NativeLoweringForm from "./lowerForms/NativeLoweringForm";
import { formContext, stateContext } from "../../Contexts/Context";
import PolkadotPageHeader from "../PageHeaders/PolkadotPageHeader";
import FormNav from "./FormNav";
import MobileFormNav from "./MobileFormNav";

function LoweringForm() {
	const [tokenAddress, setTokenAddress] = useState("");
	const [amount, setAmount] = useState("");
	const [t1Recipient, setT1Recipient] = useState("");
	const [lowerLoading, setLowerLoading] = useState("");
	const { ENVIRONMENT_NAME, EVM_NETWORK_NAME } = useContext(stateContext);

	const title = "Lower";
	const description = `Move funds from ${ENVIRONMENT_NAME} to ${EVM_NETWORK_NAME}`;
	const isValidPage = true;
	const SUPPORTED_TOKENS = window?.appConfig?.SUPPORTED_TOKENS;
	const tokenTabsKeys = Object.keys(SUPPORTED_TOKENS);
	const tokenTabs = Object.values(SUPPORTED_TOKENS).map(
		(value, index) => value.value
	);

	return (
		<>
			<PolkadotPageHeader
				title={title}
				description={description}
				isValidPage={isValidPage}
			/>
			<div
				className="container-fluid mt-4"
				style={{ marginBottom: "20%" }}
			>
				<div className="row">
					<main role="main" className="text-center">
						<div className="content mr-auto ml-auto">
							<div
								className="container form-container"
								style={{ minHeight: "100%" }}
							>
								<formContext.Provider
									value={{
										t1Recipient,
										setT1Recipient,
										amount,
										setAmount,
										tokenAddress,
										setTokenAddress,
										lowerLoading,
										setLowerLoading,
									}}
								>
									<div className="row mobile-ext">
										<MobileFormNav tokenTabs={tokenTabs} />
									</div>
									<div className="row">
										<div className="col-2 desktop-ext">
											<FormNav tokenTabs={tokenTabs} />
										</div>

										<div className="col">
											<div
												className="row text-center tab-content justify-center"
												style={{
													color: "black",
												}}
												id="myTabContent"
											>
												{tokenTabsKeys.includes(
													"MAIN_TOKEN"
												) && (
													<MainTokenLoweringForm
														tokenType={
															SUPPORTED_TOKENS
																.MAIN_TOKEN
																.value
														}
														position={
															SUPPORTED_TOKENS
																.MAIN_TOKEN
																.position
														}
													/>
												)}
												{tokenTabsKeys.includes(
													"ERC20"
												) && (
													<Erc20LoweringForm
														tokenType={
															SUPPORTED_TOKENS
																.ERC20.value
														}
														position={
															SUPPORTED_TOKENS
																.ERC20.position
														}
														isERC20={true}
														isERC777={false}
													/>
												)}
												{tokenTabsKeys.includes(
													"ERC777"
												) && (
													<Erc777LoweringForm
														tokenType={
															SUPPORTED_TOKENS
																.ERC777.value
														}
														position={
															SUPPORTED_TOKENS
																.ERC777.position
														}
														isERC20={false}
														isERC777={true}
													/>
												)}
												{tokenTabsKeys.includes(
													"NATIVE"
												) && (
													<NativeLoweringForm
														tokenType={
															SUPPORTED_TOKENS
																.NATIVE.value
														}
														position={
															SUPPORTED_TOKENS
																.NATIVE.position
														}
													/>
												)}
											</div>
										</div>
									</div>
								</formContext.Provider>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

export default LoweringForm;
