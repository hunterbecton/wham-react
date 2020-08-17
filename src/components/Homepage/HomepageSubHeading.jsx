import styled from 'styled-components'

const HomepageSubHeading = styled.h3`
    font-size: 1.25rem;
    letter-spacing: normal;
    font-weight: 400;
    color: ${props => props.theme.colors.light1};
    text-align: center;
    max-width: 26rem;
    margin-bottom: ${props => props.mb ? props.mb : '2rem'};
`

export default HomepageSubHeading