import styled from 'styled-components'

const PaginationButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: 1 / span 12;

    @media ${props => props.theme.breakpoints.m} {
      grid-column: 1 / span 6;
  }

`

export default PaginationButtonWrapper