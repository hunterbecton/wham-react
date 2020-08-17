import styled, { keyframes } from 'styled-components'
import EmojiWrapper from './EmojiWrapper'

const floatAnimation = (one, two) => keyframes`
    0% { bottom: -10%; transform : translateX(0)}
    50% { transform: translateX(${one}px)}
    100% {bottom: 110%; transform: translateX(${two}px)}
`;

const EmojiHomeBubble = styled(EmojiWrapper)`
position: absolute;
  user-select: none;
  font-size: ${({ size }) => (size ? size : 2)}rem;
  bottom: 0;
  left: ${({ left }) => (left ? left : 10)}%;
  animation: ${({ one, two }) => floatAnimation(one, two)}
    ${({ size }) => (size < 3 ? 8 : 9)}s ease-in forwards;
`
export default EmojiHomeBubble