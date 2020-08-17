import styled from 'styled-components'

const FooterWrapper = styled.footer`
    grid-column: 1 / span 14;
    display: grid;
    grid-template-columns: 1fr repeat(12, minmax(auto, 4.2rem)) 1fr;
    gap: 0 2rem;
    padding: 3rem 0;
    background-color: ${props => props.theme.colors.dark2};
    margin-top: 5rem; 

  @media ${props => props.theme.breakpoints.m} {
    grid-column: 1 / span 8;
    grid-template-columns: 2rem repeat(6, 1fr) 2rem;
    gap: 0 1rem;
  }
`

export default FooterWrapper