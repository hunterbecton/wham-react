import styled from 'styled-components'

const MainNav = styled.nav`
  grid-column: 2 / span 12;
  padding: ${props => props.theme.spacings.m} 0;
  display: flex;
  align-items: center;

    .nav-links {
        margin-left: auto;
    }

    .mobile-menu__button {
      display: none;
      margin-left: auto;
      z-index: 1000;
    }

    .nav-links button {
        margin: 0 0 0 ${props => props.theme.spacings.s};
    }


    @media ${props => props.theme.breakpoints.m} {
    grid-column: 2 / span 6;
  }

  @media ${props => props.theme.breakpoints.s} {
    .nav-links {
      display: none;
    }

    .mobile-menu__button {
      display: initial;
    }
  }

`

export default MainNav