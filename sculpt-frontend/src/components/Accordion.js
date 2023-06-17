import React, { useState } from 'react';
// import { CareFAQs } from './Data';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';

const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  background: #f2f4f8;
`;

const Container = styled.div`
  position: absolute;
  top: 5%;
  box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);
  padding-right: 10px;
`;

const Wrap = styled.div`
  background: #D3DAE7;
  color: #6a768d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  text-align: center;
  cursor: pointer;

  h1 {
    padding: 1rem;
    font-size: 1.5rem;
  }

  // span {
  //   margin-left: 20px;
  // }
`;

const Dropdown = styled.div`
  background: #D3DAE7;
  color: #6a768d;
  width: 80vw;
  height: 80px;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  justify-content: center;
  // align-items: center;
  border: 1px solid #fff;
  // border-top: 1px solid #fff;

  p {
    font-size: 15px;
  }
`;

const Accordion = (props) => {
  const { data } = props;
  const [clicked, setClicked] = useState(false);

  const toggle = index => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <IconContext.Provider value={{ color: '#ff326e', size: '25px' }}>
      <AccordionSection>
        <Container>
          {data.map((item, index) => {
            return (
              <>
                <Wrap onClick={() => toggle(index)} key={index}>
                  <h1>{item.question}</h1>
                  <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                </Wrap>
                {clicked === index ? (
                  <Dropdown>
                    <p>{item.answer}</p>
                  </Dropdown>
                ) : null}
              </>
            );
          })}
        </Container>
      </AccordionSection>
    </IconContext.Provider>
  );
};

export default Accordion;
