import styled from "styled-components"

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr repeat(12, minmax(auto, 4.2rem)) 1fr;
  gap: ${props => props.gtl ? props.gtl : '2rem'} ${props => props.gsl ? props.gsl : '2rem'};
  margin: ${props => props.margin ? props.margin : 0};

  @media ${props => props.theme.breakpoints.m} {
    grid-template-columns: 2rem repeat(6, 1fr) 2rem;
    gap: ${props => props.gtm ? props.gtm : '1rem'} ${props => props.gsm ? props.gsm : '1rem'};
  }

  @media ${props => props.theme.breakpoints.s} {
    grid-template-columns: 1rem repeat(6, 1fr) 1rem;
    gap: ${props => props.gts ? props.gts : '1rem'} ${props => props.gss ? props.gss : '1rem'};
  }
`

export default Grid