import EthereumPageHeader from "../PageHeaders/EthereumPageHeader";
import LowerQueryForm from "../Forms/LowerQueryForm";
import { stateContext } from "../../Contexts/Context";
import { useContext } from "react";

const isValidPage = true;
const title = "Claim";

// Sets up the claim page by combining both the header and the query form
const ClaimPage = () => {
	const { ENVIRONMENT_NAME, EVM_NETWORK_NAME } = useContext(stateContext);
	const description = `Move funds from ${ENVIRONMENT_NAME} to ${EVM_NETWORK_NAME}`;

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
