import styled from 'styled-components'

const AuthTitle = styled.h2`
    color: ${props => props.theme.colors.light1};
    font-size: 1.5rem;
    font-weight: 500;
    margin: ${props => props.margin ? props.margin : 0};
`

export default AuthTitle