import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import "./styles/intern.css";

const Intern = (props) => {
	const { logo, title, description, linkText, link } = props;
	
	return (
		<React.Fragment>
			<div className="intern">
				<Link to={link} target="_blank">
					<div className="intern-container">
						<div className="intern-logo">
							<img src={logo} alt="logo" />
						</div>
						<div className="intern-title">{title}</div>
						<div className="intern-description">{description}</div>
						<div className="intern-link">
							<div className="intern-link-icon">
								<FontAwesomeIcon icon={faLink} />
							</div>

							<div className="intern-link-text">{linkText}</div>
						</div>
					</div>
				</Link>
			</div>
		</React.Fragment>
	);
};

export default Intern;
