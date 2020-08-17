import React from 'react'
import styled from 'styled-components'

const PillWrapper = styled.div`
    padding: 0.5rem 1rem;
    text-transform: capitalize;
    color: ${props => props.theme.colors.light1};
    font-size: 0.75rem;
    font-weight: 700;
    width: fit-content;
    background-color: ${props => {
        switch (props.status) {
            case 'drafted':
                return props.theme.colors.blue1
            case 'published':
                return props.theme.colors.green1
            case 'archived':
                return props.theme.colors.pink1
            default:
                return props.theme.colors.blue1
        }
    }}
`

const Pill = ({ status }) => {
    return (
        <PillWrapper status={status}>
            {status}
        </PillWrapper>
    )
}

export default Pill
