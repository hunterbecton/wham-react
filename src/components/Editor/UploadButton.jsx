import styled from 'styled-components'

const UploadButton = styled.label`
    cursor: pointer;
    border: none;
    background-color: ${props => props.theme.colors.blue1};
    color: ${props => props.theme.colors.light1};
    box-shadow: 0.25rem 0.25rem 0px 0px ${props => props.theme.colors.pink1};
    display: inline-block;
    font-weight: 700;
    font-size: 0.75rem;
    padding: 0.5rem 1rem;
    height: fit-content;
    margin-right: 1rem;
    transition: ${props => props.theme.animations.button};

    &:hover {
        transform: translate(0.125rem, 0.125rem);
        box-shadow: 0rem 0rem 0px 0px ${props => props.theme.colors.pink1};
    }

`

export default UploadButton