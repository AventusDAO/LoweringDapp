import { OldLowerMethod } from "./OldLowerMethod";
import { NewLowerMethod } from "./NewLowerMethod";

export const LowerDataFromBackendOnlyLowerID = ({ tx }) => {
	return (
		<div
			id={`lowersCollapse${tx.id}`}
			className="accordion-collapse collapse"
			aria-labelledby="lowersFromBackend"
			data-bs-parent="#readyLowersAccordion"
		>
			<div className="accordion-body">
				{tx.claimData ? (
					typeof tx.claimData === "string" ? (
						<NewLowerMethod claimData={tx.claimData} />
					) : (
						<OldLowerMethod claimData={tx.claimData} />
					)
				) : (
					""
				)}
			</div>
		</div>
	);
};
