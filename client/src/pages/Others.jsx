import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

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
    }
`;
const Button = styled.button`
  border-radius: 3px;
  margin-top: 5vh;
  border: none;
  font-size: 2vh;
  padding: 15px 30px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  &:hover {
    color: ${({ theme }) => theme.text};
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


export const Others = () => {
    const socials = {
        twitter: "https://twitter.com/VedantHelwatkar",
        github: "https://github.com/vedanthelwatkar/Projects",
        linkedin: "https://www.linkedin.com/in/vedant-helwatkar-8b8a9a265",
        instagram: "https://www.instagram.com/vedannnntt/",
        mail:"mailto:vedanthelwatkar@gmail.com"
    };
    const dispatch = useDispatch();
    const nav = useNavigate()
    const handleLogout = () => {
      const shouldLogout = window.confirm("Are you sure you want to logout?");
  
      if (shouldLogout) {
        dispatch(logout());
        nav("/")
      }
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
                    <Social>
                        <a href={socials.mail} target="_blank" rel="noreferrer">
                            <SocialIcon>
                                <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                            </SocialIcon>
                            <SocialText>Contact via mail</SocialText>
                        </a>
                    </Social>
                </Socials>
            </Details>
            <Button onClick={handleLogout}>
                Logout
            </Button>
        </Container>
    );
};
