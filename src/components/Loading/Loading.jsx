import React from 'react'
import Loader from '../../images/loader.svg'
import LoadingSection from './LoadingSection'

const Loading = () => {
    return (
        <LoadingSection>
            <img src={Loader} alt="Loader" height="100" />
        </LoadingSection>
    )
}

export default Loading
