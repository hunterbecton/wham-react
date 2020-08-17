import React from 'react'
import { Emoji } from 'emoji-mart'
import MainLayout from '../Layout/MainLayout'
import ErrorSection from './ErrorSection'
import ErrorTitle from './ErrorTitle'

const NoPage = () => {
    return (
        <MainLayout>
            <ErrorSection>
                <Emoji
                    emoji='tired_face'
                    skin={1}
                    size={64}
                    native={true}
                />
                <ErrorTitle>That page doesn't exist.</ErrorTitle>
            </ErrorSection>
        </MainLayout>
    )
}

export default NoPage
