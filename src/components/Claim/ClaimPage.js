import EthereumPageHeader from "../PageHeaders/EthereumPageHeader";
import LowerQueryForm from "../Forms/LowerQueryForm";

const isValidPage = true;
const title = "Claim";
const description = "Move funds from the AvN to Ethereum";

// Sets up the claim page by combining both the header and the query form
const ClaimPage = () => {
    return (
        <>
            <EthereumPageHeader
                title={title}
                description={description}
                isValidPage={isValidPage}
            />
            <div className="container-fluid mt-4">
                <div className="row">
                    <main role="main" className="text-center">
                        <div className="content mr-auto ml-auto">
                            <LowerQueryForm />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default ClaimPage;
