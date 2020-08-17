import styled from 'styled-components'
import FormikControl from '../Form/FormikControl'

const EditorTitle = styled(FormikControl)`
    appearance: none;
    background-color: transparent;
    border: none;
    font-family: 'Roboto', sans-serif;
    font-size: 3rem;
    font-weight: 500;
    color: ${props => props.theme.colors.light1};
    margin-bottom: 2rem;

    &::placeholder {
        color: ${props => props.theme.colors.light2};
    }

    &:focus {
        outline: none;
    }

`

export default EditorTitle