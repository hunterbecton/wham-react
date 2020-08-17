import styled from 'styled-components'

const AuthContainer = styled.div`
    grid-column: 5 / span 6;

    @media ${props => props.theme.breakpoints.m} {
      grid-column: 2 / span 6;
  }


`

export default AuthContainer