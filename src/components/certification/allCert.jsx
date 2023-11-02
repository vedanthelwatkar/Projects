import React from "react";

import Cert from "./cert";

import INFO from "../../data/user";

import "./styles/allCert.css";

const AllCert = () => {
	return (
		<div className="all-projects-container">
			{INFO.certs.map((certs, index) => (
				<div className="all-projects-project" key={index}>
					<Cert
						logo={certs.logo}
						title={certs.title}
						description={certs.description}
						linkText={certs.linkText}
						link={certs.link}
					/>
				</div>
			))}
		</div>
	);
};

export default AllCert;
