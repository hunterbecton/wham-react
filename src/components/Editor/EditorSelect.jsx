import styled from 'styled-components'
import FormikControl from '../Form/FormikControl'

const EditorSelect = styled(FormikControl)`
    position: relative; 
    background-color: transparent;
    border: none;
    font-family: 'Roboto', sans-serif;
    font-size: 1.2rem;
    font-weight: 500;
    color: ${props => props.theme.colors.light1};
    cursor: pointer;
    width: fit-content;
    padding-right: 1rem;

    &:focus {
        outline: none;
    }

`

export default EditorSelect