import React from 'react'
import { Emoji } from 'emoji-mart'
import ErrorSection from './ErrorSection'
import ErrorTitle from './ErrorTitle'

const Error = () => {
    return (
        <ErrorSection>
            <Emoji
                emoji='tired_face'
                skin={1}
                size={64}
                native={true}
            />
            <ErrorTitle>There was an error processing your request.</ErrorTitle>
        </ErrorSection>
    )
}

export default Error