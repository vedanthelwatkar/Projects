import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import AllCert from "../components/certification/allCert";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/projects.css";

const Articles = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "projects");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Projects | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="certifications" />
				<div className="content-wrapper">
					<div className="projects-container">
						<div className="title projects-title">
							My Certifications in this field
						</div>
						<div className="subtitle projects-subtitle">
						Explore my certifications, a testament to my commitment to continuous learning and professional growth in the dynamic field of web development.
						</div>

						<div className="projects-list">
							<AllCert />
						</div>
					</div>
					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Articles;
