import styled from 'styled-components'

const DashboardTableWrapper = styled.div`
    grid-column: 1 / span 12;
    overflow-x: auto;
    background-color: ${props => props.theme.colors.dark2};

    @media ${props => props.theme.breakpoints.m} {
      grid-column: 1 / span 6
  }

`

export default DashboardTableWrapper