import React from "react";

import Intern from "./intern";

import INFO from "../../data/user";

import "./styles/allIntern.css";

const AllIntern = () => {
	return (
		<div className="all-projects-container">
			{INFO.intern.map((intern, index) => (
				<div className="all-projects-project" key={index}>
					<Intern
						logo={intern.logo}
						title={intern.title}
						description={intern.description}
						linkText={intern.linkText}
						link={intern.link}
					/>
				</div>
			))}
		</div>
	);
};

export default AllIntern;
