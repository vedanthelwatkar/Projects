import React from "react";

import "./styles/tech.css";

const Tech = (props) => {
	const { logo, title } = props;

	return (
		<React.Fragment>
			<div className="tech">
					<div className="tech-container">
						<div className="tech-logo">
							<img src={logo} alt="logo" className="centered-image"/>
						</div>
						<div className="tech-title">{title}</div>
					</div>
			</div>
		</React.Fragment>
	);
};

export default Tech;
