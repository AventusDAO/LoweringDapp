import React, { useEffect, useState, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
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
import Withdraw from "./Withdraw";

const GOERLI_ID = 5;
const ETHEREUM_MAINNET_ID = 1;

function App() {
    const [avnAddress, setAvnAddress] = useState("");
    const [avtAddress, setAvtAddress] = useState("");
    const [avnContract, setAvnContract] = useState(null);
    const [avtContract, setAvtContract] = useState(null);
    const [account, setAccount] = useState("");
    const [networkId, setNetworkId] = useState("");
    const [loadWeb3, setLoadWeb3] = useState(null);
    const [switchChecked, setSwitchChecked] = useState(null);
    const [polkAccounts, setPolkAccounts] = useState("");
    const [sender, setSender] = useState("");
    const [testnetState, setTestnetState] = useState("PUBLIC_TESTNET");
    const [networkState, setNetworkState] = useState("MAINNET");
    const [AVN_GATEWAY_URL, setAVN_GATEWAY_URL] = useState("MAINNET");
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
                setAvnAddress(
                    Networks.networks[networkId].avn_contract_address[
                        testnetState
                    ]
                );
                setAvtAddress(
                    Networks.networks[networkId].avt_contract_address
                );
                setAvnContract(new web3.eth.Contract(ABI, avnAddress));
                setAvtContract(new web3.eth.Contract(ABI, avtAddress));
            } else if (networkId === ETHEREUM_MAINNET_ID) {
                setAvnAddress(
                    Networks.networks[networkId].avn_contract_address
                );
                setAvtAddress(
                    Networks.networks[networkId].avt_contract_address
                );
                setAvnContract(new web3.eth.Contract(ABI, avnAddress));
                setAvtContract(new web3.eth.Contract(ABI, avtAddress));
            } else {
                networkErrorHandler("Please use Ethereum MAINNET or GOERLI");
            }
        }
    }, [account, avnAddress, avtAddress, testnetState]);

    useEffect(() => {
        checkForWeb3();
    }, [account, checkForWeb3]);

    return (
        <div>
            <stateContext.Provider
                value={{
                    account,
                    networkId,
                    avtAddress,
                    avnAddress,
                    avtContract,
                    avnContract,
                    switchChecked,
                    setAvtContract,
                    setAvnContract,
                    setAvtAddress,
                    setAvnAddress,
                    AVN_GATEWAY_URL,
                    setAVN_GATEWAY_URL,
                    AVN_RELAYER,
                    setAVN_RELAYER,
                    setNetworkId,
                    setSwitchChecked,
                    loadWeb3,
                    setTestnetState,
                    setNetworkState,
                    networkState,
                    testnetState,
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
                    <Route path="/lowers/:address" element={<Withdraw />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </stateContext.Provider>
        </div>
    );
}

export default App;
