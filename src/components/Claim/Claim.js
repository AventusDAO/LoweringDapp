import { useParams } from "react-router-dom";
import { toAddress } from "../../utils/polkadotFunctions/polkadotToAddress";
import NotFound from "../Extras/NotFound";
import useFetch from "../Extras/useFetch";
import EthereumPageHeader from "../PageHeaders/EthereumPageHeader";
import ReadyToClaim from "./ReadyToClaim";
import { Spinner } from "../Extras/Tools";
import { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import BackButton from "../Extras/BackButton";
import { NoLowers } from "./NoLowers";

const Claim = () => {
    let { account } = useParams();
    const { AVN_GATEWAY_URL } = useContext(stateContext);
    account = toAddress(account).toLowerCase();
    const baseUrl = `${AVN_GATEWAY_URL}lowers`;
    const url = `${baseUrl}?account=${account}`;
    const { data, error, isPending } = useFetch(url);
    const isValidPage = true;
    const title = "Claim";
    const description = "Move funds from the AvN to Ethereum";
    return (
        <>
            <EthereumPageHeader
                title={title}
                description={description}
                isValidPage={isValidPage}
            />
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
                            <ReadyToClaim lowers={data} />
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Claim;
