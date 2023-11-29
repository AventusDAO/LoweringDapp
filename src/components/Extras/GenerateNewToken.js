import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import { regenerateGatewayToken } from "../../utils/errorPopups/networkAccessErrorPopups";

export default function GenerateNewToken() {
	const { set_HasPayer } = useContext(stateContext);
	return (
		<>
			<div className="text-end">
				<button
					className="btn generate-new-token-button"
					onClick={() => {
						regenerateGatewayToken().then((result) => {
							set_HasPayer(result);
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
