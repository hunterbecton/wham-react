import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :root {
      font-size: 16px;
      position: relative;
      margin-left: calc(100vw - 100%);
    }
    
    html, body {
      font-family: 'Roboto', sans-serif;
      min-height:100%;
    }

    body {
      background-color: ${props => props.theme.colors.dark1};
      overflow-x: hidden;
    }

`   