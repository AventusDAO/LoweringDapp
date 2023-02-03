import React, { useEffect, useState, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Networks from "../config/Networks.json";
import ABI from "../config/abi.json";
import LoadWeb3 from "../utils/ethereumFunctions/loadWeb3";
import { stateContext } from "../Contexts/Context";
import ClaimPage from "./Claim/ClaimPage";
import LoweringForm from "./Forms/LoweringForm";
import BalanceForm from "./Forms/BalanceForms/BalanceForm";
import NotFound from "./Extras/NotFound";
import Claim from "./Claim/Claim";
import { Faq } from "./Faq";
import Footer from "./Footer";

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
    const [walletName, setWalletName] = useState("");
    const [sender, setSender] = useState("");
    const [networkState, setNetworkState] = useState("MAINNET");
    const [testnetState, setTestnetState] = useState("");
    const [AVN_GATEWAY_URL, setAVN_GATEWAY_URL] = useState("");
    const [EXPLORER_TX_URL, setEXPLORER_TX_URL] = useState("");
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
            try {
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
            } catch (err) {}
        }

        if (web3 && account) {
            const networkId = await web3.eth.net.getId();
            setNetworkId(networkId);
            if (networkId === GOERLI_ID) {
                setAvnAddress(
                    Networks.NETWORKS[networkId].AVN_CONTRACT_ADDRESS[
                        networkState
                    ]
                );

                setAvtAddress(
                    Networks.NETWORKS[networkId].AVT_CONTRACT_ADDRESS
                );
                setAvnContract(new web3.eth.Contract(ABI, avnAddress));
                setAvtContract(new web3.eth.Contract(ABI, avtAddress));
            } else if (networkId === ETHEREUM_MAINNET_ID) {
                setAvnAddress(
                    Networks.NETWORKS[networkId].AVN_CONTRACT_ADDRESS
                );
                setAvtAddress(
                    Networks.NETWORKS[networkId].AVT_CONTRACT_ADDRESS
                );
                setAvnContract(new web3.eth.Contract(ABI, avnAddress));
                setAvtContract(new web3.eth.Contract(ABI, avtAddress));
            }
        }
    }, [account, avnAddress, avtAddress, networkState]);

    useEffect(() => {
        checkForWeb3();
    }, [account, checkForWeb3, networkId]);

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
                    setAccount,
                    setAvnContract,
                    setAvtAddress,
                    setAvnAddress,
                    AVN_GATEWAY_URL,
                    EXPLORER_TX_URL,
                    walletName,
                    setWalletName,
                    setAVN_GATEWAY_URL,
                    setEXPLORER_TX_URL,
                    AVN_RELAYER,
                    setAVN_RELAYER,
                    setNetworkId,
                    setSwitchChecked,
                    testnetState,
                    setTestnetState,
                    loadWeb3,
                    setNetworkState,
                    networkState,
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
                    <Route path="/claim" element={<ClaimPage />} />
                    <Route path="/lowers/:account" element={<Claim />} />
                    <Route path="/FAQ" element={<Faq />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </stateContext.Provider>
            <Footer />
        </div>
    );
}

export default App;
