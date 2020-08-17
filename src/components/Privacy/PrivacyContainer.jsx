import styled from 'styled-components'

const PrivacyContainer = styled.div`
    color: ${props => props.theme.colors.light1};
    margin: 4rem 0;
    grid-column: 3 / span 8;

    p,li,h1,h2,h3,h4,h5,h6 {
        margin: 2rem 0;
    }

    p {
        line-height: 150%;
    }

    p br {
        content: "";
        display: block;
        margin: 2em;
    }

    a {
        color: ${props => props.theme.colors.blue1};
    }

    @media ${props => props.theme.breakpoints.m} {
    grid-column: 1 / span 6;
  }

`

export default PrivacyContainer