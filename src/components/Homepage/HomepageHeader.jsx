import styled from 'styled-components'

const HomepageHeader = styled.header`
    grid-column: 1 / span 12;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    margin: ${props => props.margin ? props.margin : '2rem 0'};

    @media ${props => props.theme.breakpoints.m} {
      grid-column: 1 / span 6;
  }
`

export default HomepageHeader