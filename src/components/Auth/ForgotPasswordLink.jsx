import styled from 'styled-components'
import { Link } from '@reach/router'

const ForgotPasswordLink = styled(Link)`
    display: block;
    color: ${props => props.theme.colors.light2};
    font-size: 0.9rem;
    font-weight: 400;
    text-decoration: none;
    margin: 2rem 0 0 0;
    transition: ${props => props.theme.animations.link};

    &:hover {
        color: ${props => props.theme.colors.blue1};
    }
`

export default ForgotPasswordLink