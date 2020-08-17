import styled from 'styled-components'

const DashboardTable = styled.table`
    width: 100%;
    background-color: ${props => props.theme.colors.dark2};
    border: none;
    border-spacing: 0;
    border-collapse: collapse;
    table-layout: fixed;
    overflow-x: scroll;

    th {
        text-align: left;
        font-size: 1rem;
        font-weight: 700;
        color: ${props => props.theme.colors.light1};
    }

    th:nth-child(1) {
        width: 40%;
    }

    /* th:nth-child(2) {
        width: 25%;
    }

    th:nth-child(3) {
        width: 25%;
    }

    th:nth-child(4) {
        width: 10%;
    } */

    tr:not(:first-child):hover {
        background-color: ${props => props.theme.colors.dark3};
        cursor: pointer;
    }

    td:last-child {
        text-align: right;
    }

    th, td {
        padding: 1.5rem;
    }


    td a, td p {
        color: ${props => props.theme.colors.light1};
        font-size: 1rem;
        font-weight: 400;
    }

    td a {
        text-decoration: none;
        transition: ${props => props.theme.animations.link};

        &:hover {
            color: ${props => props.theme.colors.blue1};
        }

    }

    @media ${props => props.theme.breakpoints.m} {
      grid-column: 1 / span 6
  }

`

export default DashboardTable