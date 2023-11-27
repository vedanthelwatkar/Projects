import React from "react";

import Project from "./project";

import INFO from "../../data/user";

import "./styles/allProjects.css";

import { Tilt } from 'react-tilt'

const defaultOptions = {
	reverse:        false,
	max:            35,
	perspective:    1000,
	scale:          1,
	speed:          1000,
	transition:     true,
	axis:           null,
	reset:          true,
	easing:         "cubic-bezier(.03,.98,.52,.99)",
}
const AllProjects = () => {
	return (
		<div className="all-projects-container">
			{INFO.projects.map((project, index) => (
				<div className="all-projects-project" key={index}>
					<Tilt options={defaultOptions}>
					<Project
						logo={project.logo}
						title={project.title}
						description={project.description}
						linkText={project.linkText}
						link={project.link}
					/>
					</Tilt>
				</div>	
			))}
		</div>
		
	);
};

export default AllProjects;
