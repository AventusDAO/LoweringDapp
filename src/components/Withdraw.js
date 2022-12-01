import { useParams } from "react-router-dom";
import NotFound from "./Extras/NotFound";
import useFetch from "./Extras/useFetch";
import EthereumPageHeader from "./PageHeaders/EthereumPageHeader";
import ReadyToWithdraw from "./ReadyToWithdraw";

const Withdraw = () => {
    const { address } = useParams();
    /*
    Dummy data until backend is setup.
    Check out the README for instructions on how to run the dummy data
    */
    const base_url = "http://localhost:8000/lowers";
    const url = `${base_url}?address=${address}`;
    const { data, error, isPending } = useFetch(url);

    return (
        <>
            <EthereumPageHeader />
            <div className="container-fluid form-container mt-4">
                {isPending ? <div> Loading... </div> : ""}
                {error ? <div> {error}... </div> : ""}
                {data == "" ? (
                    <NotFound />
                ) : (
                    <div>
                        <br />
                        <ReadyToWithdraw lowers={data} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Withdraw;
