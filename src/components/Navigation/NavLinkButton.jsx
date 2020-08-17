import styled from 'styled-components'

const NavLinkButton = styled.button`
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    margin: 0 ${props => props.theme.spacings.s};
    transition: ${props => props.theme.animations.link};
    color: ${props => props.theme.colors.light1};
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.colors.blue1};
    }
`

export default NavLinkButton