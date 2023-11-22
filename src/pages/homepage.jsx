import React from "react";
import { Helmet } from "react-helmet";

import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faTwitter,
	faGithub,
	faLinkedin,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Footer from "../components/common/footer";
import DarkMode from "../components/DarkMode/DarkMode";
import NavBar from "../components/common/navBar";
import AllIntern from "../components/intern/allIntern";
import INFO from "../data/user";
import SEO from "../data/seo";
import "./styles/homepage.css";

const Homepage = () => {


	const currentSEO = SEO.find((item) => item.page === "home");



	const resume = ()=>{
		let url = "https://drive.google.com/file/d/1QlCgwdYdDM0E58rV2CBvJn5-KIivEZK0/view?usp=drive_link"
		window.open(url, '_blank');
	}
	const download = () => {
		let url = "https://drive.google.com/uc?export=download&id=1QlCgwdYdDM0E58rV2CBvJn5-KIivEZK0";
		let a = document.createElement('a');
		a.href = url;
		a.download = 'Resume Vedant_Helwatkar.pdf';
		a.click();
	}



	return (
		<React.Fragment>
			
			<Helmet>
				<title>{INFO.main.title}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>
			
			<div className="page-content">
				<NavBar active="home"/>
				<div className="content-wrapper">
					<div className="homepage-container">
						<div className="homepage-first-area">
							<div className="homepage-first-area-left-side">
							<div className="title homepage-title">
							{INFO.homepage.title}
							<br></br>
							<div className="button-container">
							<button className="butt" onClick={resume}>
								<span>Resume</span>
							</button>
							<button className="Btn" onClick={download}>
								<svg className="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
								<path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
								</svg>
								<span className="icon2"></span>
								<span className="tooltip">Download</span>
							</button>
							</div>
							</div>


								<div className="subtitle homepage-subtitle">
									{INFO.homepage.description}
								</div>
							</div>

							
						</div>

						<div className="homepage-socials">
							<a
								href={INFO.socials.twitter}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faTwitter}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={INFO.socials.github}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faGithub}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={INFO.socials.instagram}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faInstagram}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={`mailto:${INFO.main.email}`}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faMailBulk}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={INFO.socials.linkedin}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faLinkedin}
									className="homepage-social-icon"
								/>
							</a>
						</div>
						<div className="homepage-projects">
							<div className="home-title">
										Professional Experience
							</div>
							<AllIntern />
						</div>
						<div className="page-footer">
						<Footer />
					</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Homepage;