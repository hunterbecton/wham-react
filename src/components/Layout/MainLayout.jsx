import React from 'react'
import Grid from '../Layout/Grid'
import NavBar from '../Navigation/Navbar'
import Footer from '../Footer/Footer'

const MainLayout = ({ children, margin }) => {
    return (
        <Grid gtl="0" gsl="2rem" margin={margin}>
            <NavBar />
            {children}
        </Grid>
    )
}

export default MainLayout
