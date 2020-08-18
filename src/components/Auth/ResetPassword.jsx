import React, { Fragment, useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { navigate, useLocation } from '@reach/router'
import { parse } from "query-string"
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/useAuth'
import MainLayout from '../Layout/MainLayout'
import Button from '../Button/Button'
import AuthContainer from './AuthContainer'
import AuthWrapper from './AuthWrapper'
import AuthText from './AuthText'
import AuthTextWrapper from './AuthTextWrapper'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import AuthTitle from './AuthTitle'

const ResetPassword = () => {
    const { resetPassword } = useAuth()

    const [isError, setIsError] = useState(false)

    const [initialData, setInitialData] = useState(null)

    const location = useLocation()

    const searchParams = parse(location.search)

    // Check if token is in props and pass in
    useEffect(() => {
        // Handle no token
        if (!searchParams.token) {
            return setIsError(true)
        }

        setInitialData({
            token: searchParams.token,
            password: '',
            passwordConfirm: '',
        })

        return () => {
            setInitialData({
                token: '',
                password: '',
                passwordConfirm: '',
            })
        }

    }, [searchParams.token])

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Required')
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                'Password must be at least 8 characters and include 1 of each: lowercase letter, uppercase letter, number, and symbol',
            ),
        passwordConfirm: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    })

    const onSubmit = async data => {
        try {
            const res = await resetPassword(data)

            if (res.status === 'success') {
                toast('Password updated! 🥳')
                navigate('/login')
            }

            if (res.status === 'fail') {
                toast.error('Could not change password.')
            }
        } catch (error) {
            toast.error('Invalid credentials.')
        }
    }

    if (isError) {
        return (
            <Fragment>
                <MainLayout>
                    <Error />
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

    if (initialData) {
        return (
            <MainLayout>
                <Formik
                    initialValues={initialData}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isValid, isSubmitting }) => (
                        <Fragment>
                            <AuthContainer>
                                <AuthTitle margin="2rem 0 0 0">Reset Password</AuthTitle>
                                <AuthWrapper>
                                    <Form>
                                        <AuthTextWrapper>
                                            <AuthText
                                                control="input"
                                                type="password"
                                                label="Password"
                                                name="password"
                                                placeholder="Enter your password"
                                            />
                                        </AuthTextWrapper>
                                        <AuthTextWrapper margin="2rem 0 1.5rem 0">
                                            <AuthText
                                                control="input"
                                                type="password"
                                                label="Confirm Password"
                                                name="passwordConfirm"
                                                placeholder="Confirm your password"
                                            />
                                        </AuthTextWrapper>
                                        <Button size="s" disabled={!isValid || isSubmitting} type="submit">
                                            Reset
                                        </Button>
                                    </Form>
                                </AuthWrapper>
                            </AuthContainer>
                        </Fragment>
                    )}
                </Formik>
            </MainLayout>
        )
    }
}

export default ResetPassword
