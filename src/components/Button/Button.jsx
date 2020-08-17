import React from 'react'
import styled from 'styled-components'

const ButtonWrapper = ({ className, children, onClick, onKeyDown, type, disabled }) => {
    return (
        <button type={type ? type : 'button'} className={className} onClick={onClick} onKeyDown={onKeyDown} disabled={disabled}>
            {children}
        </button>
    )
}

const Button = styled(ButtonWrapper)`
    cursor: pointer;
    border: none;
    background-color: ${props => props.theme.colors.blue1};
    color: ${props => props.theme.colors.light1};
    box-shadow: 0.25rem 0.25rem 0px 0px ${props => props.theme.colors.pink1};
    font-weight: 700;
    font-size: ${props => {
        switch (props.size) {
            case "s":
                return '0.75rem'
            case "m":
                return `${props.theme.spacings.s}`
            case "l":
                return '1.25rem'
            default:
                return `${props.theme.spacings.s}`
        }
    }};
    padding: ${props => {
        switch (props.size) {
            case "m":
                return `${props.theme.spacings.xs} ${props.theme.spacings.s}`
            case "l":
                return `0.75rem 1.25rem`
            default:
                return `${props.theme.spacings.xs} ${props.theme.spacings.s}`
        }
    }};
    transition: ${props => props.theme.animations.button};
    width: fit-content;

    &:hover {
        transform: translate(0.125rem, 0.125rem);
        box-shadow: 0rem 0rem 0px 0px ${props => props.theme.colors.pink1};
    }

    &:disabled {
        color: ${props => props.theme.colors.light2};
        pointer-events: none;
        background-color: ${props => props.theme.colors.dark2};
        box-shadow: 0.25rem 0.25rem 0px 0px ${props => props.theme.colors.dark3};
    }

`

export default Button