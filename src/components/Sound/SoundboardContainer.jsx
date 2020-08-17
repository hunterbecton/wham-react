import styled from "styled-components";
import MaxWidthSection from '../Layout/MaxWidthSection'

const SoundboardContainer = styled(MaxWidthSection)`
    margin: ${props => props.theme.spacings.m} 0;

    div {
        transition: ${props => props.theme.animations.button};
    }

    div:hover {
        transform: translate(0.25rem, 0.25rem)
    }

    div:nth-child(7n + 1) {
        background-color: ${props => props.theme.colors.red1};
        box-shadow: 0.5rem 0.5rem 0px 0px ${props => props.theme.colors.red2};
    }

    div:nth-child(7n + 1):hover {
        box-shadow: 0rem 0rem 0px 0px ${props => props.theme.colors.red2};
    }

    div:nth-child(7n + 2) {
        background-color: ${props => props.theme.colors.orange1};
        box-shadow: 0.5rem 0.5rem 0px 0px ${props => props.theme.colors.orange2};
    }

    div:nth-child(7n + 2):hover {
        box-shadow: 0rem 0rem 0px 0px ${props => props.theme.colors.orange2};
    }

    div:nth-child(7n +3) {
        background-color: ${props => props.theme.colors.yellow1};
        box-shadow: 0.5rem 0.5rem 0px 0px ${props => props.theme.colors.yellow2};
    }

    div:nth-child(7n + 3):hover {
        box-shadow: 0rem 0rem 0px 0px ${props => props.theme.colors.yellow2};
    }

    div:nth-child(7n +4) {
        background-color: ${props => props.theme.colors.green1};
        box-shadow: 0.5rem 0.5rem 0px 0px ${props => props.theme.colors.green2};
    }

    div:nth-child(7n + 4):hover {
        box-shadow: 0rem 0rem 0px 0px ${props => props.theme.colors.green2};
    }

    div:nth-child(7n +5) {
        background-color: ${props => props.theme.colors.blue1};
        box-shadow: 0.5rem 0.5rem 0px 0px ${props => props.theme.colors.blue2};
    }

    div:nth-child(7n + 5):hover {
        box-shadow: 0rem 0rem 0px 0px ${props => props.theme.colors.blue2};
    }

    div:nth-child(7n + 6) {
        background-color: ${props => props.theme.colors.pink1};
        box-shadow: 0.5rem 0.5rem 0px 0px ${props => props.theme.colors.pink2};
    }

    div:nth-child(7n + 6):hover {
        box-shadow: 0rem 0rem 0px 0px ${props => props.theme.colors.pink2};
    }

    div:nth-child(7n + 7) {
        background-color: ${props => props.theme.colors.purple1};
        box-shadow: 0.5rem 0.5rem 0px 0px ${props => props.theme.colors.purple2};
    }

    div:nth-child(7n + 7):hover {
        box-shadow: 0rem 0rem 0px 0px ${props => props.theme.colors.purple2};
    }

`;

export default SoundboardContainer;
