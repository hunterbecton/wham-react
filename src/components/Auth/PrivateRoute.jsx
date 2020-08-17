import React, { Fragment } from 'react'
import { Redirect } from '@reach/router'

import { useAuth } from '../../hooks/useAuth'
import MainLayout from '../Layout/MainLayout'
import Loading from '../Loading/Loading'

const PrivateRoute = ({ as: Component, roles, ...props }) => {
  const { user, isAuthenticating } = useAuth()

  if (isAuthenticating) {
    return (
      <Fragment>
        <MainLayout>
          <Loading />
        </MainLayout>
      </Fragment>
    )
  }

  return (
    <>
      {user ? (
        <Component {...props} />
      ) : (
          <Redirect from={props.path} to="/login" noThrow />
        )}
    </>
  )
}

export default PrivateRoute
