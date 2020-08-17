import React from 'react'

import MaxWidthSection from '../Layout/MaxWidthSection'
import SoundboardTitle from './SoundboardTitle'

const SoundboardHeader = ({ title }) => {
    return (
        <MaxWidthSection>
            <SoundboardTitle>{title}</SoundboardTitle>
        </MaxWidthSection>
    )
}

export default SoundboardHeader
