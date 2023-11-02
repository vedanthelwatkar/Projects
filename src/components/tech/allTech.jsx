import React from "react";

import Tech from "./tech";

import INFO from "../../data/user";

import "./styles/allTech.css";

const AllTech = () => {
	return (
		<div className="all-projects-container">
			{INFO.tech.map((tech, index) => (
				<div className="all-projects-project" key={index}>
					<Tech
						logo={tech.logo}
						title={tech.title}
					/>
				</div>
			))}
		</div>
	);
};

export default AllTech;
