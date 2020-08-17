import styled from 'styled-components'

const EditorToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  p {
    color: ${props => props.theme.colors.light1};
    font-size: 0.9rem;
    font-weight: 500;
    margin-left: 1rem;
  }

`

export default EditorToggleWrapper