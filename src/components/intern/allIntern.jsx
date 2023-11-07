import React from "react";

import Intern from "./intern";

import INFO from "../../data/user";

import "./styles/allIntern.css";

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

const AllIntern = () => {
	return (
		<div className="all-intern-container">
			{INFO.intern.map((intern, index) => (
				<div className="all-intern-project" key={index}>
					<Tilt options={defaultOptions} style={{ height: 250, width: 250 }}>
					<Intern
						logo={intern.logo}
						title={intern.title}
						description={intern.description}
						linkText={intern.linkText}
						link={intern.link}
					/>
					</Tilt>
				</div>
			))}
		</div>
	);
};

export default AllIntern;
