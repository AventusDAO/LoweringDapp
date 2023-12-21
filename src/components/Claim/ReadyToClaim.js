import React, { useContext, useState } from "react";
import { addressSlicer } from "../../utils/randomFunctions";
import BackButton from "../Extras/BackButton";
import { LowerDataFromBackend } from "./LowerDataFromBackend";
import { Pagination } from "../Pagination";
import { stateContext } from "../../Contexts/Context";
import { NoLowers } from "./NoLowers";

const ReadyToClaim = ({ lowers }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const { COMPANY_NAME_WITH_UNDERSCORE } = useContext(stateContext);
	const lowersPerPage = 5;
	const indexOfLastPost = currentPage * lowersPerPage;
	const indexOfFirstPost = indexOfLastPost - lowersPerPage;
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	var data;
	var currentLowers;
	if (lowers) {
		try {
			data = lowers.lowerData;
			if (data.values().next().value !== null) {
				data.forEach((tx, index) => {
					tx.id = index;
				});
				currentLowers = data.slice(indexOfFirstPost, indexOfLastPost);
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<div
				className="accordion"
				id="readyLowersAccordion"
				style={{ marginBottom: "30%" }}
			>
				{currentLowers ? (
					<div>
						<div className="col"></div>
						<BackButton />
						<h1
							className={`${COMPANY_NAME_WITH_UNDERSCORE}-maintitle`}
						>
							Outstanding lowers
						</h1>
						<br />
						{currentLowers.map((tx) => (
							<div key={tx.id}>
								<div className="accordion-item">
									<h2
										className="accordion-header"
										id="lowersFromBackend"
									>
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target={`#lowersCollapse${tx.id}`}
											aria-expanded="false"
											aria-controls="lowersFromBackend"
										>
											{tx.claimData ? (
												Object.keys(tx.claimData)
													.length !== 0 ? (
													<div>
														<span className="badge bg-success rounded-pill">
															Available
														</span>
														&nbsp;
													</div>
												) : (
													<div>
														<span className="badge bg-danger rounded-pill">
															Awaiting data
														</span>
														&nbsp;
													</div>
												)
											) : (
												<div>
													<span className="badge bg-danger rounded-pill">
														Awaiting data
													</span>
													&nbsp;
												</div>
											)}

											<span className="desktop-ext">
												{`Recipient: ${tx.to}`}
											</span>
											<span className="mobile-ext">
												{`Recipient: ${addressSlicer(
													tx.to,
													8,
													34
												)}`}
											</span>
											<br />
										</button>
									</h2>
									<LowerDataFromBackend tx={tx} />
								</div>
								<br />
							</div>
						))}
						<Pagination
							tabsPerPage={lowersPerPage}
							totalTabs={data.length}
							paginate={paginate}
						/>
					</div>
				) : (
					<NoLowers />
				)}
			</div>
		</>
	);
};

export default ReadyToClaim;
