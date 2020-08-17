import styled from "styled-components"

const MaxWidthSection = styled.section`
  grid-column: 2 / span 12;
  display: grid;
  grid-template-columns: repeat(12, minmax(auto, 4.2rem));
  gap: ${props => props.gt ? props.gt : '2rem'} ${props => props.gs ? props.gs : '2rem'};

  @media ${props => props.theme.breakpoints.m} {
      grid-column: 2 / span 6;
      grid-template-columns: repeat(6, 1fr);
      gap: ${props => props.gtm ? props.gtm : '1rem'} ${props => props.gsm ? props.gsm : '1rem'};
  }

  @media ${props => props.theme.breakpoints.s} {
    gap: ${props => props.gts ? props.gts : '1rem'} ${props => props.gss ? props.gss : '1rem'};
  }

`

export default MaxWidthSection