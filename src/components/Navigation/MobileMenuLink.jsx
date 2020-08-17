import React from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'

const StyledNavLink = props => (
    <Link
        {...props}
        getProps={({ isPartiallyCurrent }) => {
            // the object returned here is passed to the
            // anchor element's props
            return {
                style: {
                    color: isPartiallyCurrent ? "#00C7EF" : ""
                }
            };
        }}
    />
);

const MobileMenuLink = styled(StyledNavLink)`
    font-size: 2.5rem;
    font-weight: 700;
    text-decoration: none;
    margin: 1rem;
    transition: ${props => props.theme.animations.link};
    color: ${props => props.theme.colors.light1};

    &:hover {
        color: ${props => props.theme.colors.blue1};
    }

`

export default MobileMenuLink