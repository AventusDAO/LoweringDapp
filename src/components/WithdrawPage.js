import EthereumPageHeader from "./EthereumPageHeader";
import QueryForm from "./Forms/QueryForm";

const WithdrawPage = () => {
    return (
        <>
            <EthereumPageHeader />
            <div className="container-fluid mt-4">
                <div className="row">
                    <main role="main" className="text-center">
                        <div className="content mr-auto ml-auto">
                            <QueryForm />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default WithdrawPage;
