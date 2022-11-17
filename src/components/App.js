import React, { useEffect, useState, useCallback } from "react";
import { Route, useLocation, Routes } from "react-router-dom";
import "../styles/App.css";
import Networks from "../config/Networks.json";
import ABI from "../config/abi.json";
import LoadWeb3 from "../functions/loadWeb3";
import { networkErrorHandler } from "../functions/errorHandlers";
import { stateContext } from "../Contexts/Context";
import WithdrawPage from "./WithdrawPage";
import LoweringForm from "./Forms/LoweringForm";
import BalanceForm from "./Forms/BalanceForm";
import NotFound from "./Extras/NotFound";

const GOERLI_ID = 5;
const ETHEREUM_MAINNET_ID = 1;

function App() {
    const [avn_address, setAvn_address] = useState("");
    const [avt_address, setAvt_address] = useState("");
    const [avn_contract, setAvn_contract] = useState(null);
    const [avt_contract, setAvt_contract] = useState(null);
    const [account, setAccount] = useState("");
    const [networkId, setNetworkId] = useState("");
    const [loadWeb3, setLoadWeb3] = useState(null);
    const [switchChecked, setSwitchChecked] = useState(null);
    const [polkAccounts, setPolkAccounts] = useState("");
    const [sender, setSender] = useState("");
    const [testnet_state, setTestnet_state] = useState("Public_Testnet");
    const [network_state, setNetwork_state] = useState("Mainnet");
    const [AVN_GATEWAY_URL, setAVN_GATEWAY_URL] = useState("Mainnet");
    const [POLK_AVT_CONTRACT_ADDRESS, setPOLK_AVT_CONTRACT_ADDRESS] = useState(
        "0x0d88eD6E74bbFD96B831231638b66C05571e824F"
    );
    const [AVN_RELAYER, setAVN_RELAYER] = useState(
        "5Gh6CfQUNDzsk7TQ8Tt8SR9h8mAQXpEpeZjNKFoVxYWqLAEB"
    );

    const checkForWeb3 = useCallback(async () => {
        const web3 = await LoadWeb3();
        setLoadWeb3(web3);
        if (web3) {
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
        }
        if (web3 && account) {
            const networkId = await web3.eth.net.getId();
            setNetworkId(networkId);
            //initialise Aventus Contracts and restrict Ethereum networks.
            if (networkId === GOERLI_ID) {
                setAvn_address(
                    Networks.networks[networkId].avn_contract_address[
                        testnet_state
                    ]
                );
                setAvt_address(
                    Networks.networks[networkId].avt_contract_address
                );
                setAvn_contract(new web3.eth.Contract(ABI, avn_address));
                setAvt_contract(new web3.eth.Contract(ABI, avt_address));
            } else if (networkId === ETHEREUM_MAINNET_ID) {
                setAvn_address(
                    Networks.networks[networkId].avn_contract_address
                );
                setAvt_address(
                    Networks.networks[networkId].avt_contract_address
                );
                setAvn_contract(new web3.eth.Contract(ABI, avn_address));
                setAvt_contract(new web3.eth.Contract(ABI, avt_address));
            } else {
                networkErrorHandler("Please use Ethereum MAINNET or GOERLI");
            }
        }
    }, [account, avn_address, avt_address, testnet_state]);

    useEffect(() => {
        checkForWeb3();
    }, [account, checkForWeb3]);

    return (
        <div>
            <stateContext.Provider
                value={{
                    account,
                    networkId,
                    avt_address,
                    avn_address,
                    avt_contract,
                    avn_contract,
                    switchChecked,
                    setAvt_contract,
                    setAvn_contract,
                    setAvt_address,
                    setAvn_address,
                    AVN_GATEWAY_URL,
                    setAVN_GATEWAY_URL,
                    AVN_RELAYER,
                    setAVN_RELAYER,
                    setNetworkId,
                    setSwitchChecked,
                    loadWeb3,
                    setTestnet_state,
                    setNetwork_state,
                    network_state,
                    testnet_state,
                    sender,
                    setSender,
                    polkAccounts,
                    setPolkAccounts,
                    POLK_AVT_CONTRACT_ADDRESS,
                    setPOLK_AVT_CONTRACT_ADDRESS,
                }}
            >
                <Routes>
                    <Route path="/" element={<LoweringForm />} />
                    <Route path="/balance" element={<BalanceForm />} />
                    <Route path="/withdraw" element={<WithdrawPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>

                {/* <Footer /> */}
            </stateContext.Provider>
        </div>
    );
}

export default App;
