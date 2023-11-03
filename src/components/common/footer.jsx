import React from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import INFO from "../../data/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles/footer.css";

const Footer = () => {
	return (
		<React.Fragment>
			<div className="footer">
				<div className="footer-links">
				<a
						href={`mailto:${INFO.main.email}`}
						target="_blank"
						rel="noreferrer"
					>
						<div className="social-icon">
							<FontAwesomeIcon icon={faEnvelope} />
						</div>

						<div className="social-text">{INFO.main.email}</div>
					</a>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Footer;
