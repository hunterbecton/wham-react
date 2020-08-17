import React, { Fragment, useState, useEffect } from 'react'
import { navigate, useLocation } from '@reach/router'
import moment from 'moment'
import { parse } from "query-string"

import {
    apiGetAllMySoundboards
} from '../../api/Soundboard'
import MainLayout from '../Layout/MainLayout'
import Loading from '../Loading/Loading';
import DashboardWrapper from './DashboardWrapper'
import DashboardTable from './DashboardTable'
import DashboardTitle from './DashboardTitle'
import DashboardTableWrapper from './DashboardTableWrapper'
import Pill from '../Pill/Pill'
import PaginationWrapper from '../Pagination/PaginationWrapper'
import PaginationButton from '../Pagination/PaginationButton'
import PaginationButtonWrapper from '../Pagination/PaginationButtonWrapper'
import Empty from './Empty'
import OpenButton from './OpenButton'

const Dashboard = () => {

    const [initialData, setInitialData] = useState(null)

    const [totalCount, setTotalCount] = useState(0)

    const [numPages, setNumPages] = useState(0)

    const [isFirst, setIsFirst] = useState(false)

    const [isLast, setIsLast] = useState(false)

    const [prevPage, setPrevPage] = useState('')

    const [nextPage, setNextPage] = useState('')

    const [isError, setIsError] = useState(false)

    const location = useLocation()

    const searchParams = parse(location.search)

    const currentPage = searchParams.page ? Number(searchParams.page) : 0

    // Load data
    useEffect(() => {
        // Define async function and call it later
        const fetchData = async (pageNum) => {

            const data = await apiGetAllMySoundboards(pageNum)

            // If success set data
            if (data.status === 'success') {
                setTotalCount(data.data.totalSoundboards)
                setInitialData(data.data.soundboards)
            }

            if (data.status !== 'success') {
                switch (data.error.statusCode) {
                    case 401:
                        return navigate('/login')
                    default:
                        return navigate('/login')
                }
            }

        }

        // Handle no page query
        if (!searchParams.page) {
            navigate('/dashboard?page=1')
        }

        // Pass in page if provided
        if (searchParams.page) {
            fetchData(searchParams.page)
        }

        return () => {
            setTotalCount(0)
            setInitialData(null)
            setIsError(false)
        }


    }, [searchParams.page])

    // Set pagination values
    useEffect(() => {
        if (initialData && totalCount !== 0) {
            setNumPages(Math.ceil(totalCount / 10))
            setIsFirst(currentPage === 1)
            setIsLast(currentPage === numPages)
            setPrevPage(currentPage - 1 === 1 ? "/dashboard?page=1" : `/dashboard?page=${currentPage - 1}`)
            setNextPage(`/dashboard?page=${currentPage + 1}`)
        }

        return () => {
            setNumPages(0)
            setIsFirst(false)
            setIsLast(false)
            setPrevPage('')
            setNextPage('')
        }

    }, [initialData, totalCount, currentPage, numPages])

    const handleKeyDown = (e, id) => {
        if (e.key === "Enter") {
            navigate(`/soundboard/edit/${id}`)
        }
    }

    const handlePagination = (e, page) => {
        if (e.key === "Enter") {
            navigate(page)
        }
    }

    const handleSoundboardOpen = (e, id) => {
        e.stopPropagation()

        navigate(`/soundboard/${id}`)
    }

    const handleSoundboardOpenClick = (e, id) => {
        e.stopPropagation()

        if (e.key === "Enter") {
            navigate(`/soundboard/${id}`)
        }
    }

    if (isError) {
        return (
            <Fragment>
                <MainLayout>
                    <Loading />
                </MainLayout>
            </Fragment>
        )
    }

    if (!initialData) {
        return (
            <Fragment>
                <MainLayout>
                    <Loading />
                </MainLayout>
            </Fragment>
        )
    }

    if (initialData && initialData.length === 0) {
        return (
            <MainLayout>
                <Empty />
            </MainLayout>
        )
    }

    if (initialData) {
        return (
            <MainLayout margin="0 0 5rem 0">
                <DashboardWrapper>
                    <DashboardTitle>Soundboards</DashboardTitle>
                    <DashboardTableWrapper>
                        <DashboardTable>
                            <tbody>
                                <tr>
                                    <th>Title</th>
                                    <th>Modified</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                                {initialData.map((soundboard, i) => (
                                    <tr key={i} role="button" tabIndex="0" onKeyDown={(e) => handleKeyDown(e, soundboard.id)} onClick={() => navigate(`/soundboard/edit/${soundboard.id}`)}>
                                        <td><p>{soundboard.title}</p></td>
                                        <td><p>{moment(soundboard.updatedAt).utc().format('MM/DD/YY')}</p></td>
                                        <td><Pill status={soundboard.status} /></td>
                                        <td>
                                            <OpenButton role="button" tabIndex="0" onClick={(e) => handleSoundboardOpen(e, soundboard.id)} onKeyDown={(e) => handleSoundboardOpenClick(e, soundboard.id)} status={soundboard.status} className="las la-external-link-alt"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </DashboardTable>
                    </DashboardTableWrapper>
                </DashboardWrapper>
                <PaginationWrapper>
                    <PaginationButtonWrapper>
                        <PaginationButton dir="prev" isFirst={isFirst} disabled={isFirst} role="button" onClick={() => navigate(prevPage)} onKeyDown={(e) => handlePagination(e, prevPage)} />
                        <PaginationButton dir="next" isLast={isLast} disabled={isLast} role="button" onClick={() => navigate(nextPage)} onKeyDown={(e) => handlePagination(e, nextPage)} />
                    </PaginationButtonWrapper>
                </PaginationWrapper>
            </MainLayout >
        )
    }

}

export default Dashboard
