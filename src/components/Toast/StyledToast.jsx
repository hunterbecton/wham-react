import styled from 'styled-components'
import { ToastContainer } from 'react-toastify';

const StyledToast = styled(ToastContainer)`
    .Toastify__toast  {
        border-radius: 0;
    }

    .Toastify__toast--default {
        background-color: ${props => props.theme.colors.dark2};
        color: ${props => props.theme.colors.light1};
    }

    .Toastify__close-button--default {
        color: ${props => props.theme.colors.light2};
        opacity: 1;
    }

    .Toastify__progress-bar--default {
        background: ${props => `linear-gradient(to right, ${props.theme.colors.red1}, ${props.theme.colors.orange1}, ${props.theme.colors.yellow1}, ${props.theme.colors.green1},  ${props.theme.colors.purple1}, ${props.theme.colors.pink1})`};
    }

    .Toastify__toast--error {
        background-color: ${props => props.theme.colors.pink1};
    }

`

export default StyledToast
