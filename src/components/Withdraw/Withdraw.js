import { useParams } from "react-router-dom";
import { toAddress } from "../../utils/polkadotFunctions/polkadotToAddress";
import NotFound from "../Extras/NotFound";
import useFetch from "../Extras/useFetch";
import EthereumPageHeader from "../PageHeaders/EthereumPageHeader";
import ReadyToWithdraw from "./ReadyToWithdraw";
import { Spinner } from "../Extras/Tools";
import { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import BackButton from "../Extras/BackButton";
import { NoLowers } from "./NoLowers";

const Withdraw = () => {
    let { account } = useParams();
    const { AVN_GATEWAY_URL } = useContext(stateContext);
    account = toAddress(account).toLowerCase();
    const baseUrl = `${AVN_GATEWAY_URL}lowers`;
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
                {error ? (
                    <div>
                        <BackButton /> {error}...
                    </div>
                ) : (
                    ""
                )}
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
