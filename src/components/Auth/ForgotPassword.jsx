import React, { Fragment } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/useAuth'
import MainLayout from '../Layout/MainLayout'
import Button from '../Button/Button'
import AuthContainer from './AuthContainer'
import AuthWrapper from './AuthWrapper'
import AuthText from './AuthText'
import AuthTextWrapper from './AuthTextWrapper'
import AuthTitle from './AuthTitle'

const ForgotPassword = () => {
    const { forgotPassword } = useAuth()

    const initialData = {
        email: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
    })

    const onSubmit = async data => {
        try {
            const res = await forgotPassword(data)

            if (res.status === 'success') {
                toast('Check your email to complete! 💌')
            }

            if (res.status === 'fail') {
                toast.error('Invalid request.')
            }
        } catch (error) {
            toast.error('Could not send email.')
        }
    }

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
                            <AuthTitle margin="2rem 0 0 0">Forgot Password</AuthTitle>
                            <AuthWrapper>
                                <Form>
                                    <AuthTextWrapper margin="0 0 1.5rem 0">
                                        <AuthText
                                            control="input"
                                            type="text"
                                            label="Email"
                                            name="email"
                                            placeholder="Enter your email"
                                            autoComplete="on"
                                        />
                                    </AuthTextWrapper>
                                    <Button size="s" disabled={!isValid || isSubmitting} type="submit">
                                        Submit
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

export default ForgotPassword
