import { useContext } from "react";
import { stateContext } from "../../Contexts/Context";

const CompanyLogo = () => {
	const { COMPANY_URL, COMPANY_NAME_WITH_UNDERSCORE } =
		useContext(stateContext);
	return (
		<a
			href={COMPANY_URL}
			className="navbar-brand"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img
				src={require(`../../assets/company_${COMPANY_NAME_WITH_UNDERSCORE}/company_logo.png`)}
				className="header-logo"
				alt="logo"
			/>
		</a>
	);
};

export default CompanyLogo;
