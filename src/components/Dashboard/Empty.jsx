import React from 'react'
import { Emoji } from 'emoji-mart'
import { navigate } from '@reach/router'
import EmptySection from './EmptySection'
import EmptyTitle from './EmptyTitle'
import Button from '../Button/Button'

const Error = () => {
    return (
        <EmptySection>
            <Emoji
                emoji='wave'
                skin={1}
                size={64}
                native={true}
            />
            <EmptyTitle>Welcome! Let's create your first soundboard.</EmptyTitle>
            <Button onClick={() => navigate('/soundboard/create')}>Create</Button>
        </EmptySection>
    )
}

export default Error