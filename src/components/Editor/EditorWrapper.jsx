import styled from "styled-components";
import MaxWidthSection from '../Layout/MaxWidthSection'

const EditorWrapper = styled(MaxWidthSection)`
    margin: ${props => props.theme.spacings.m} 0;
`

export default EditorWrapper