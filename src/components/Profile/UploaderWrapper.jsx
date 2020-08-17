import styled from 'styled-components'

const UploaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    label {
        color: ${props => props.theme.colors.light2};
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
    }

`

export default UploaderWrapper