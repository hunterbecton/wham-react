import styled from 'styled-components'

const EditorEmojiSelect = styled.div`
    display: flex;
    align-items: center;

    select {
        position: relative; 
        background-color: transparent;
        border: none;
        font-family: 'Roboto', sans-serif;
        font-size: 1.2rem;
        font-weight: 500;
        color: ${props => props.theme.colors.light1};
        cursor: pointer;
        width: fit-content;
        margin-left: 0.5rem;
    }

    select:focus {
        outline: none;

    }

`

export default EditorEmojiSelect