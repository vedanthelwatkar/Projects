import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: ${({ theme }) => theme.text};
`;

const Info = styled.h1`
    font-size: 2.5vh;
`;

const Contact = styled.h2``;

const Details = styled.span``;

const Socials = styled.div`
margin-top:3vh;
`;

const Social = styled.div`
    display: flex;
    padding-bottom: 20px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }

    a {
        color:${({ theme }) => theme.text};
        text-decoration: none;
    }
`;

const SocialIcon = styled.div`
    font-size: 15px;
    color: var(--secondary-color);
`;

const SocialText = styled.div`
    color: var(--secondary-color);
    padding-left: 30px;
    margin-top: -20px;
    font-weight: 600;
    font-size: 14px;
    transition: transform 0.3s ease-in-out;
`;

const EmailWrapper = styled.div`
    display: flex;
    padding-bottom: 20px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }

    a {
        text-decoration: none;
    }
`;

const Email = styled.div`
    &::before {
        content: "";
        display: block;
        padding-top: 20px;
        border-top: 3px solid #f4f4f5;
        margin-top: 20px;
    }

    padding-top: 20px;
`;

export const Others = () => {
    const socials = {
        twitter: "https://twitter.com/VedantHelwatkar",
        github: "https://github.com/vedanthelwatkar/Projects",
        linkedin: "https://www.linkedin.com/in/vedant-helwatkar-8b8a9a265",
        instagram: "https://www.instagram.com/vedannnntt/",
    };

    return (
        <Container>
            <Info>Try again after a few days!</Info>
            <Contact>Contact me !!</Contact>
            <Details>
                <Socials>
                    <Social>
                        <a href={socials.twitter} target="_blank" rel="noreferrer">
                            <SocialIcon>
                                <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                            </SocialIcon>
                            <SocialText>Follow on Twitter</SocialText>
                        </a>
                    </Social>

                    <Social>
                        <a href={socials.github} target="_blank" rel="noreferrer">
                            <SocialIcon>
                                <FontAwesomeIcon icon={faGithub} className="social-icon" />
                            </SocialIcon>
                            <SocialText>Follow on GitHub</SocialText>
                        </a>
                    </Social>

                    <Social>
                        <a href={socials.linkedin} target="_blank" rel="noreferrer">
                            <SocialIcon>
                                <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                            </SocialIcon>
                            <SocialText>Follow on LinkedIn</SocialText>
                        </a>
                    </Social>

                    <Social>
                        <a href={socials.instagram} target="_blank" rel="noreferrer">
                            <SocialIcon>
                                <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                            </SocialIcon>
                            <SocialText>Follow on Instagram</SocialText>
                        </a>
                    </Social>
                </Socials>
            </Details>
        </Container>
    );
};
