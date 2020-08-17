import styled from 'styled-components'

const EditorToggle = styled.div`
  position: relative;
  background-color: ${props => props.theme.colors.dark1};
  height: 1.5rem;
  width: 3rem;
  border-radius: 3rem;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    background-color: ${props => props.theme.colors.light2};
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    transition: ${props => props.theme.animations.toggle};
  }

  &.active::before {
    background-color: ${props => props.theme.colors.blue1};
    transform: translateX(1.5rem);
  }

`

export default EditorToggle