import styled from 'styled-components'

const MobileMenu = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: ${props => props.isOpen ? "100vw" : "0"};
    background-color: ${props => props.theme.colors.dark2};
    z-index: 999;
    transition: ${props => props.theme.animations.menu};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    .mobile__nav-links {
        opacity: ${props => props.isOpen ? '1' : '0'};
        display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    }

`

export default MobileMenu