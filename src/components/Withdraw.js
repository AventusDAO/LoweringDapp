import { useParams } from "react-router-dom";
import { toAddress } from "../utils/polkadotFunctions/polkadotToAddress";
import NotFound from "./Extras/NotFound";
import useFetch from "./Extras/useFetch";
import EthereumPageHeader from "./PageHeaders/EthereumPageHeader";
import ReadyToWithdraw from "./Withdraw/ReadyToWithdraw";
import { Spinner } from "./Extras/Tools";
import { useContext } from "react";
import { stateContext } from "../Contexts/Context";

const Withdraw = () => {
    let { account } = useParams();
    const { AVN_GATEWAY_URL } = useContext(stateContext);
    console.log(AVN_GATEWAY_URL);
    /*
    Dummy data until backend is setup.
    Check out the README for instructions on how to run the dummy data
    */
    account = toAddress(account).toLowerCase();
    const baseUrl = `${AVN_GATEWAY_URL}/lowers`;
    const url = `${baseUrl}?account=${account}`;
    const { data, error, isPending } = useFetch(url);

    return (
        <>
            <EthereumPageHeader />
            <div className="container-fluid form-container mt-4">
                {isPending ? (
                    <div>
                        {" "}
                        <Spinner />{" "}
                    </div>
                ) : (
                    ""
                )}
                {error ? <div> {error}... </div> : ""}

                {data &&
                    (data == "" ? (
                        <NotFound />
                    ) : data.lowerData.length === 0 ? (
                        <NoLowers />
                    ) : (
                        <div>
                            <br />
                            <ReadyToWithdraw lowers={data} />
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Withdraw;
