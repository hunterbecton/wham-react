import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ProvideAuth } from './hooks/useAuth'
import { ProvideSoundboard } from './hooks/useSoundboard'
import { GlobalStyles } from './styles/GlobalStyles'
import Theme from './styles/theme'
import StyledToast from './components/Toast/StyledToast'
import { ThemeProvider } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
  <ProvideAuth>
    <ProvideSoundboard>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <StyledToast />
        <App />
      </ThemeProvider>
    </ProvideSoundboard>
  </ProvideAuth>,
  document.getElementById('root'),
)
