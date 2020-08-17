import React from 'react'
import styled from 'styled-components'

const HomepageProFeatureWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3rem 1.5rem 4rem 1.5rem;
`

const HomepageProFeatureImage = styled.img`
    height: 3rem;
    margin: 1rem;
`

const HomepageProFeatureText = styled.p`
    color: ${props => props.theme.colors.light1};
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
`

const HomepageProFeature = ({ image, alt, text }) => {
    return (
        <HomepageProFeatureWrapper>
            <HomepageProFeatureImage src={image} alt={alt} />
            <HomepageProFeatureText>{text}</HomepageProFeatureText>
        </HomepageProFeatureWrapper>
    )
}

export default HomepageProFeature
