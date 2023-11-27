import React from "react";

import Cert from "./cert";

import INFO from "../../data/user";

import "./styles/allCert.css";
import { Tilt } from 'react-tilt'

const defaultOptions = {
	reverse:        false,
	max:            35,
	perspective:    1000,
	scale:          1.1,
	speed:          1000,
	transition:     true,
	axis:           null,
	reset:          true,
	easing:         "cubic-bezier(.03,.98,.52,.99)",
}

const AllCert = () => {
	return (
		<div className="all-certs-container">
			{INFO.certs.map((certs, index) => (
				<div className="all-certs-project" key={index}>
					<Tilt options={defaultOptions} style={{ height: 250, width: 250 }}>
					<Cert
						logo={certs.logo}
						title={certs.title}
						description={certs.description}
						linkText={certs.linkText}
						link={certs.link}
					/>
					</Tilt>
				</div>
			))}
		</div>
	);
};

export default AllCert;
