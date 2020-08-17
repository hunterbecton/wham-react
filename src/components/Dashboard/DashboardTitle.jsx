import styled from 'styled-components'

const DashboardTitle = styled.h1`
    color: ${props => props.theme.colors.light1};
    font-size: 2.25rem;
    font-weight: 500;
    grid-column: 1 / span 6;
    margin-top: ${props => props.theme.spacings.m}
`

export default DashboardTitle