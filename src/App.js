import React, { Fragment } from 'react'

const App = ({ children }) => {
  // const location = useLocation()

  // const { isLoggedIn } = useAuth()

  // useEffect(() => {
  //   const runIsLoggedIn = async () => {
  //     await isLoggedIn()
  //   }

  //   runIsLoggedIn()

  // }, [location])

  return <Fragment>{children}</Fragment>
}

export default App
