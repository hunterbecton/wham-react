import styled from 'styled-components'
import ArrowPrev from '../../images/arrowPrev.svg'
import ArrowNext from '../../images/arrowNext.svg'

const PaginationButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border: none;
    border-radius: 100%;
    background-color: ${props => props.theme.colors.dark2};
    cursor: pointer;
    opacity: 1;
    transition: background-color 0.3s ease;
    margin: 0 1rem;

    &::after {
        content: ${props => props.dir === 'prev' ? `url(${ArrowPrev})` : `url(${ArrowNext})`} ;
    }

    &:hover {
        background-color: ${props => props.isLast || props.isFirst ? props.theme.colors.dark2 : props.theme.colors.dark3};
    }

    &:disabled {
        cursor: auto; 
       opacity: 0.4;
    }

`

export default PaginationButton
