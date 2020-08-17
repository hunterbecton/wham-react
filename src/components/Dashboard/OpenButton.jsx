import styled from 'styled-components'

const OpenButton = styled.i`
    display: ${props => props.status === 'published' ? 'initial' : 'none'};
    padding: 0.5rem;
    font-size: 1.25rem;
    color: #999999;
    transition: ${props => props.theme.animations.link};

    &:hover {
        color: ${props => props.theme.colors.blue1};
    }

`

export default OpenButton