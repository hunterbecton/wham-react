import styled from 'styled-components'

const Profile = styled.div`
    width: 3rem;
    height: 3rem;
    background-image: url(${props => props.photo});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: ${ props => props.theme.colors.dark1};
    border-radius: 100%;
    margin: 0 0 1rem 0;
`

export default Profile