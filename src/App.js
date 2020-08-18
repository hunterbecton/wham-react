import React, { Fragment, useEffect } from 'react';
import { useLocation } from '@reach/router'
import { useAuth } from './hooks/useAuth'

const App = ({ children }) => {

  const location = useLocation()

  const { isLoggedIn } = useAuth()

  useEffect(() => {
    const runIsLoggedIn = async () => {
      await isLoggedIn()
    }

    runIsLoggedIn()

  }, [location, isLoggedIn])

  return (
    <Fragment>
      {children}
    </Fragment>
  );
}

export default App;
