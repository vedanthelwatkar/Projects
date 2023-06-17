import React, { Component } from 'react'
//import all child components
import { CompanyInfo, ContactForm, StyledTitle, ContactContainer } from './ContactElements'



class Contact extends Component {
    render() {
        return (
            <ContactContainer>
                <StyledTitle text="Contact Us" />
                <ContactContainer wrapper>
                    <CompanyInfo />
                    <ContactForm />
                </ContactContainer>
            </ContactContainer>
        )
    }
}

export default Contact