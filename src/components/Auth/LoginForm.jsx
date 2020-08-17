import React, { Fragment } from 'react'
import { navigate } from '@reach/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/useAuth'
import MainLayout from '../Layout/MainLayout'
import AuthContainer from './AuthContainer'
import AuthWrapper from './AuthWrapper'
import Button from '../Button/Button'
import AuthText from './AuthText'
import AuthTextWrapper from './AuthTextWrapper'
import AuthTitle from './AuthTitle'
import ForgotPasswordLink from './ForgotPasswordLink'

const LoginForm = () => {
  const { login } = useAuth()

  const initialData = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  })

  const onSubmit = async data => {
    try {
      const res = await login(data)

      if (res.status === 'success') {
        navigate('/dashboard')
      }

      if (res.status === 'fail' || res.status === 'error') {
        toast.error('Invalid credentials.')
      }

    } catch (error) {
      toast.error('Invalid credentials.')
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
              <AuthTitle margin="2rem 0 0 0">Login</AuthTitle>
              <AuthWrapper>
                <Form>
                  <AuthTextWrapper>
                    <AuthText
                      control="input"
                      type="text"
                      label="Email"
                      name="email"
                      placeholder="Enter your email"
                      autoComplete="on"
                    />
                  </AuthTextWrapper>
                  <AuthTextWrapper margin="2rem 0 1.5rem 0">
                    <AuthText
                      control="input"
                      type="password"
                      label="Password"
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="off"
                    />
                  </AuthTextWrapper>
                  <Button size="s" disabled={!isValid || isSubmitting} type="submit">
                    Login
                  </Button>
                </Form>
                <ForgotPasswordLink to="/forgot-password">Forgot password</ForgotPasswordLink>
              </AuthWrapper>
            </AuthContainer>
          </Fragment>
        )}
      </Formik>
    </MainLayout>
  )
}

export default LoginForm
