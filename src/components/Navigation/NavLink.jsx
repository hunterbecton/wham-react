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

const NavLink = styled(StyledNavLink)`
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    margin: 0 ${props => props.theme.spacings.s};
    transition: ${props => props.theme.animations.link};
    color: ${props => props.theme.colors.light1};

    &:hover {
        color: ${props => props.theme.colors.blue1};
    }

`

export default NavLink