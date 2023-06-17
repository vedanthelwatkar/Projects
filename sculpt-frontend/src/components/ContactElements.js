import React from 'react';
import styled, { css } from 'styled-components';
import logo from "../images/logo.png";

const ContactStyledButton = styled.button`
    background: radial-gradient(circle, #223452, black);
    border: 0; 
    color: #fff; 
    padding: 1em; 
    text-transform: uppercase; 
    width: 100%;
    
    &:hover, &:focus {
        background: #3b5abf;
        color: #fff; 
        outline: 0; 
        transition: background-color 2s ease-out; 
    }
    
`;

export const ContactContainer = styled.div`
    margin-left: auto; 
    margin-right: auto;
    max-width: 1170px;  

    ${props => props.wrapper && css`
        box-shadow: 0 0 20px 0 rgba(184, 22, 31, 0.3);
        > * {
            padding: 1em; 
        }
        
        @media (min-width: 700px) {
            display: grid; 
            grid-template-columns: 1fr 2fr; 
            > * {
                padding: 2em; 
            }
        }
    `}
`;

const ConForm = styled.form`
display: grid; 
grid-template-columns: 1fr 1fr; 
grid-gap: 20px; 
`;

const ContactInput = styled.input`
border: 1px solid #3b5abf; 
padding: 1em; 
width: 100%; 
`;

const ContactLabel = styled.label`
display: block; 
`;

const ContactTextarea = styled.textarea`
border: 1px solid 
#3481e6
; 
padding: 1em; 
width: 100%; 
`;

export const ContactTitle = ({ className, text }) => (
    <h1 className={className}>{text}</h1>
)

export const StyledTitle = styled(ContactTitle)`
    color: #2c6eab;
    font: 70px; 
    text-align: center; 
    @media (min-width: 700px) {
        text-align: left; 
    }
`;

const WrapperCompanyInfo = styled.div`
background: radial-gradient(circle, #223452, black);
`;

const CompanyName = styled.h3`
// margin: 0 0 1rem 0;
// text-align: center;
// color: #fff; 
align-items: center;
margin-left: 90px;
cursor: pointer;
height: 60px;
@media (min-width: 700px) {
    text-align: left; 
}
`;

const WrapperList = styled.ul`
list-style: none;
margin:0 0 1rem 0;
padding:0;
line-height: 2em;
padding-bottom:30px;
text-align: center;
color: #fff;
@media (min-width: 700px) {
    text-align: left; 
}
`;

const WrapperGrid = styled.div`
    ${props => props.full && css`
        grid-column: 1 / 3;
    `}
`;

export const CompanyInfo = () => (
    <WrapperCompanyInfo>
        <CompanyName><img src={logo} alt="Logo" /></CompanyName>
        <WrapperList>
            <li>For general enquiry, please reach out to us on hello@sculpt.fit</li>
            <li>If you are a health/fitness expert and wish to partner with us, please reach out to us on partner.support@sculpt.fit</li>
            <li>If you wish to join a company as unique as you, please reach out to us on careers@curefit.com</li>
        </WrapperList>
    </WrapperCompanyInfo>
)

export const ContactForm = () => (
    <div>
        <h3>Email Us</h3>
        <ConForm>
            <WrapperGrid>
                <ContactLabel>Name</ContactLabel>
                <ContactInput type="text" name="name" />
            </WrapperGrid>
            <WrapperGrid>
                <ContactLabel>Company</ContactLabel>
                <ContactInput type="text" name="company" />
            </WrapperGrid>
            <WrapperGrid>
                <ContactLabel>Email Address</ContactLabel>
                <ContactInput type="email" name="email" />
            </WrapperGrid>
            <WrapperGrid>
                <ContactLabel>Phone Number</ContactLabel>
                <ContactInput type="text" name="phone" />
            </WrapperGrid>
            <WrapperGrid full>
                <ContactLabel>Message</ContactLabel>
                <ContactTextarea name="message" rows="5"></ContactTextarea>
            </WrapperGrid>
            <WrapperGrid full>
                <ContactStyledButton>Submit</ContactStyledButton>
            </WrapperGrid>
        </ConForm>
    </div>
)
