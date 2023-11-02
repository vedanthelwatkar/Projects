import React from "react";
import { Link } from "react-router-dom";

import "./styles/tech.css";

const Tech = (props) => {
	const { logo, title,link } = props;

	return (
		<React.Fragment>
			<div className="project">
				<Link to={link} target="_blank">
					<div className="project-container">
						<div className="project-logo">
							<img src={logo} alt="logo" />
						</div>
						<div className="project-title">{title}</div>
					</div>
				</Link>
			</div>
		</React.Fragment>
	);
};

export default Tech;
