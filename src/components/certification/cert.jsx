import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import "./styles/cert.css";

const Cert = (props) => {
	const { logo, title, description, linkText, link } = props;

	return (
		<React.Fragment>
			<div className="cert">
				<Link to={link} target="_blank">
					<div className="cert-container">
						<div className="cert-logo">
							<img src={logo} alt="logo" />
						</div>
						<div className="cert-title">{title}</div>
						<div className="cert-description">{description}</div>
						<div className="cert-link">
							<div className="cert-link-icon">
								<FontAwesomeIcon icon={faLink} />
							</div>

							<div className="cert-link-text">{linkText}</div>
						</div>
					</div>
				</Link>
			</div>
		</React.Fragment>
	);
};

export default Cert;
