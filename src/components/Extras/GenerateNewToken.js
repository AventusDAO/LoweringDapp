import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import { regenerateGatewayToken } from "../../utils/someUIpopups";

export default function GenerateNewToken() {
	const { setRegenerateToken } = useContext(stateContext);
	return (
		<>
			<div className="text-end">
				<button
					className="btn generate-new-token-button"
					onClick={() => {
						regenerateGatewayToken().then((result) => {
							setRegenerateToken(result);
						});
					}}
				>
					Generate New Token
				</button>
				<br />
			</div>
		</>
	);
}
