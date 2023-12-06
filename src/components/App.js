import React, { useEffect, useState, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import checkEthereumConnection from "../utils/ethereumUtils/checkEthereumConnection";
import LoadWeb3 from "../utils/ethereumUtils/loadWeb3";
import { stateContext } from "../Contexts/Context";
import ClaimPage from "./Claim/ClaimPage";
import LoweringForm from "./Forms/LoweringForm";
import BalanceForm from "./Forms/BalanceForms/BalanceForm";
import NotFound from "./Extras/NotFound";
import Claim from "./Claim/Claim";
import { Faq } from "./Faq";
import { AvnApi, SigningMode, SetupMode } from "avn-api";
import Footer from "./Footer";

const NETWORK_CONFIG = window?.appConfig;
const COMPANY_NAME_WITH_UNDERSCORE =
	NETWORK_CONFIG.COMPANY_NAME_WITH_UNDERSCORE;

require(`../assets/company_${COMPANY_NAME_WITH_UNDERSCORE}/css/styles.css`);

function App() {
	const [bridgeContract, setBridgeContract] = useState(null);
	const [mainTokenContract, setMainTokenContract] = useState(null);
	const [ethereumAccount, setEthereumAccount] = useState("");
	const [loadWeb3, setLoadWeb3] = useState(null);
	const [substrateAccounts, setSubstrateAccounts] = useState("");
	const [walletName, setWalletName] = useState("");
	const [substrateUser, setSubstrateUser] = useState("");
	const [metamaskNetworkId, setMetamaskNetworkId] = useState("");
	const EVM_NETWORK_NAME = NETWORK_CONFIG.EVM_NETWORK_NAME;
	const BRIDGE_CONTRACT_ADDRESS = NETWORK_CONFIG.BRIDGE_CONTRACT_ADDRESS;
	const PRIMARY_TOKEN = NETWORK_CONFIG.PRIMARY_TOKEN;
	const PRIMARY_TOKEN_ADDRESS = NETWORK_CONFIG.PRIMARY_TOKEN_ADDRESS;
	const NETWORK_ID = NETWORK_CONFIG.NETWORK_ID;
	const AVN_GATEWAY_URL = NETWORK_CONFIG.GATEWAY;
	const AVN_RELAYER = NETWORK_CONFIG.RELAYER;
	const EXPLORER_TX_URL = NETWORK_CONFIG.EXPLORER_TX_URL;
	const ETHERSCAN_TX_LINK = NETWORK_CONFIG.ETHERSCAN_TX_LINK;
	const ETHERSCAN_TOKEN_LINK = NETWORK_CONFIG.ETHERSCAN_TOKEN_LINK;
	const ENVIRONMENT_NAME = NETWORK_CONFIG.ENVIRONMENT_NAME;
	const ALTERNATE_NETWORK_NAME = NETWORK_CONFIG.ALTERNATE_NETWORK_NAME;
	const ALTERNATE_NETWORK_URL = NETWORK_CONFIG.ALTERNATE_NETWORK_URL;
	const SHOW_BALANCE_PAGE = NETWORK_CONFIG.SHOW_BALANCE_PAGE;
	const COMPANY_NAME = NETWORK_CONFIG.COMPANY_NAME;
	const COMPANY_URL = NETWORK_CONFIG.COMPANY_URL;
	const NATIVE_CONTRACT_ADDRESS =
		"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

	const [api, setApi] = useState();
	const [_hasPayer, set_HasPayer] = useState(false);

	const checkForWeb3 = useCallback(async () => {
		const web3 = await LoadWeb3();
		setLoadWeb3(web3);
		let accounts_;
		let account;
		let netId;

		if (web3) {
			try {
				accounts_ = await web3.eth.getAccounts();
				account = accounts_[0];
				netId = await web3.eth.net.getId();
			} catch (err) {}
		}
		if (web3 && account) {
			await checkEthereumConnection({
				web3,
				account,
				setEthereumAccount,
				NETWORK_ID,
				netId,
				setMetamaskNetworkId,
				setBridgeContract,
				setMainTokenContract,
				BRIDGE_CONTRACT_ADDRESS,
				PRIMARY_TOKEN_ADDRESS,
				EVM_NETWORK_NAME,
				isAppPage: true,
			});
		}
	}, [
		BRIDGE_CONTRACT_ADDRESS,
		setMetamaskNetworkId,
		NETWORK_ID,
		EVM_NETWORK_NAME,
		PRIMARY_TOKEN_ADDRESS,
	]);

	const setSdkCode = useCallback(async () => {
		if (substrateUser) {
			const setupSdk = new AvnApi(AVN_GATEWAY_URL, {
				setupMode: SetupMode.SingleUser,
				signingMode: SigningMode.RemoteSigner,
				defaultLogLevel: "error",
				hasPayer: _hasPayer,
				signer: {
					sign: (data, address) =>
						substrateUser
							.signer({ data, address })
							.then((result) => {
								return result.signature;
							}),
					address: substrateUser.address,
				},
			});
			await setupSdk.init();
			setApi(await setupSdk.apis(substrateUser.address));
		}
	}, [substrateUser, setApi, _hasPayer, AVN_GATEWAY_URL]);

	useEffect(() => {
		checkForWeb3();
		setSdkCode();
	}, [ethereumAccount, substrateUser, checkForWeb3, setSdkCode]);

	return (
		<div>
			<stateContext.Provider
				value={{
					api,
					ethereumAccount,
					setEthereumAccount,
					metamaskNetworkId,
					setMetamaskNetworkId,
					substrateUser,
					substrateAccounts,
					setSubstrateUser,
					bridgeContract,
					setBridgeContract,
					mainTokenContract,
					PRIMARY_TOKEN,
					PRIMARY_TOKEN_ADDRESS,
					BRIDGE_CONTRACT_ADDRESS,
					COMPANY_NAME,
					COMPANY_URL,
					setMainTokenContract,
					setSubstrateAccounts,
					AVN_GATEWAY_URL,
					EXPLORER_TX_URL,
					ENVIRONMENT_NAME,
					EVM_NETWORK_NAME,
					NETWORK_ID,
					SHOW_BALANCE_PAGE,
					AVN_RELAYER,
					walletName,
					_hasPayer,
					set_HasPayer,
					COMPANY_NAME_WITH_UNDERSCORE,
					setWalletName,
					ETHERSCAN_TOKEN_LINK,
					ETHERSCAN_TX_LINK,
					NATIVE_CONTRACT_ADDRESS,
					ALTERNATE_NETWORK_NAME,
					ALTERNATE_NETWORK_URL,
					loadWeb3,
				}}
			>
				<Routes>
					<Route path="/" element={<LoweringForm />} />
					{SHOW_BALANCE_PAGE && (
						<Route path="/balance" element={<BalanceForm />} />
					)}
					<Route path="/claim" element={<ClaimPage />} />
					<Route path="/lowers/:account" element={<Claim />} />
					<Route path="/FAQ" element={<Faq />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
			</stateContext.Provider>
		</div>
	);
}

export default App;
