import React, { Fragment } from 'react'
import EditorSectionWrapper from './EditorSectionWrapper'

const EditorSection = ({ children }) => {
    return (
        <Fragment>
            <EditorSectionWrapper>
                {children}
            </EditorSectionWrapper>
        </Fragment>
    )
}

export default EditorSection
