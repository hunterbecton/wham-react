import styled from 'styled-components'

const EditorContainer = styled.div`
    grid-column: 3 / span 8;

    @media ${props => props.theme.breakpoints.m} {
      grid-column: 1 / span 6;
  }


`

export default EditorContainer