import styled from 'styled-components'

const HomepageHeading = styled.h1`
    font-size: 5rem;
    line-height: 90%;
    letter-spacing: normal;
    font-weight: 700;
    color: ${props => props.theme.colors.light1};
    text-align: center;
    max-width: 50rem;
    margin-bottom: 1.5rem;
`

export default HomepageHeading