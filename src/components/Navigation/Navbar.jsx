import React, { Fragment, useState } from 'react'
import { navigate, Link } from '@reach/router'

import { useAuth } from '../../hooks/useAuth'
import Logo from '../../images/logo.svg'
import MainNav from './MainNav'
import Button from '../Button/Button'
import NavLink from '../Navigation/NavLink'
import MobileMenu from './MobileMenu'
import MobileMenuLink from './MobileMenuLink'

const Navbar = () => {
  const { user } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <MainNav>
      <Link to="/">
        <img src={Logo} alt="Wham Logo" height="24" />
      </Link>
      <div className="nav-links">
        {user && (
          <Fragment>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <Button onClick={() => navigate('/soundboard/create')}>
              Create
            </Button>
          </Fragment>
        )}
        {!user && (
          <Fragment>
            <NavLink to="/login">Login</NavLink>
            <Button onClick={() => navigate('/signup')}>Join</Button>
          </Fragment>
        )}
      </div>
      <Button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="mobile-menu__button"
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </Button>
      <MobileMenu isOpen={isMenuOpen}>
        <div className="mobile__nav-links">
          {user && (
            <Fragment>
              <MobileMenuLink to="/dashboard">Dashboard</MobileMenuLink>
              <MobileMenuLink to="/profile">Profile</MobileMenuLink>
              <MobileMenuLink to="/soundboard/create">Create</MobileMenuLink>
            </Fragment>
          )}
        </div>
      </MobileMenu>
    </MainNav>
  )
}

export default Navbar
