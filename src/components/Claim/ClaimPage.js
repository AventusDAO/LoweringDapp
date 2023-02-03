import EthereumPageHeader from "../PageHeaders/EthereumPageHeader";
import LowerQueryForm from "../Forms/LowerQueryForm";

// Sets up the claim page by combining both the header and the query form
const ClaimPage = () => {
    return (
        <>
            <EthereumPageHeader />
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
